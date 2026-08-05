// ─────────────────────────────────────────────────────────────────────────────
// NOTES — your writing / blog.
//
// Each post is one object in the `posts` array below. The /notes page lists
// them, and each gets its own page at /notes/<slug>. To add a post, copy an
// existing object and edit it.
//
// The `content` field is MARKDOWN. You can use:
//   # Heading, ## Subheading
//   **bold**, *italic*, [links](https://example.com)
//   - bullet lists
//   `inline code` and fenced code blocks with ```
//   > blockquotes
//
// List newest first — the index shows them in array order.
// ─────────────────────────────────────────────────────────────────────────────

export interface Post {
  // URL-safe id. Becomes /notes/<slug>. Lowercase, hyphens, no spaces.
  slug: string;
  title: string;
  // ISO date, e.g. "2026-02-14". Used for display and sorting.
  date: string;
  // One-line summary shown on the index and in link previews.
  summary: string;
  // The post body, written in Markdown (see note above).
  content: string;
}

export const posts: Post[] = [
  {
    slug: "a-correct-looking-output-proves-nothing",
    title: "A correct-looking output proves nothing",
    date: "2026-08-05",
    summary:
      "I wrote a bare-metal STM32 driver stack from the registers up — no HAL, no vendor code. The hard part wasn't the drivers. It was proving each one actually worked instead of assuming it did.",
    content: `
I spent this stretch building a driver stack for an STM32F401 from scratch in C — no HAL, no CubeMX, no vendor libraries, every register write derived from the reference manual. Blinking an LED bare-metal is a rite of passage. That wasn't the point. The point was to build the layer *underneath* the layer most embedded projects start from, and to prove each piece works rather than assume it does because the output looked right.

That last part turned out to be the whole project.

## The runtime that doesn't exist until you write it

Before \`main()\` can run, something has to set the stack pointer, copy initialized globals from flash into RAM, and zero the uninitialized ones. On a normal computer that's already done for you. On bare metal it isn't — you write it: the linker script, the vector table, the startup code.

Here's the thing about testing that startup code. Checking that a global equals \`0xDEADBEEF\` after reset proves the *value* is right — it does not prove your *copy loop* put it there. It could be right by accident.

So I built a negative control. I poisoned RAM with garbage, disabled the copy loop, and confirmed the garbage *survived*. Then re-enabled the loop and confirmed it overwrote the poison. That only works because a warm reset doesn't cut power, so the poison persists into the next run and the startup code has to genuinely overwrite it. Now I had proof in both directions: the loop provably fixes garbage, and provably fails to when disabled. That's the difference between "it worked" and "I proved the mechanism works."

## Three hours on a flat line

Later, probing the UART transmit pin, I got nothing. Not noise, not errors — a flat line. I spent about three hours doubting my code.

The code was fine. The board wasn't wired the way I assumed. Two solder bridges (off by default) route that pin to the on-board debugger's virtual COM port instead of to the header I was probing — the breakout header isn't an unconditional copy of every chip pin. It's in the board manual, in a table I hadn't read carefully enough.

Every measurement I took during those three hours was correct. The *assumption underneath them* was wrong. That's a lesson you only learn by losing an afternoon to it, and it's one of the most useful I've picked up: when reality disagrees with you, question your assumptions before you question your instruments.

## Proving it, four ways

By the end, a pattern had formed — a correct-looking output is never evidence that the mechanism producing it is correct:

- Confirming a value is right doesn't prove your code set it → disable the code, confirm it goes wrong.
- Confirming the source says X doesn't prove the silicon does X → read the flashed binary.
- Confirming a terminal shows the right character doesn't prove the wire carries it → decode the signal on a logic analyzer.
- Confirming a buffer has a limit doesn't prove your overflow policy → check *which* bytes survived.

Each of those caught something, or would have if it had been wrong. The interrupt-driven receive buffer got the same treatment — I verified not just that it capped at its limit, but that it dropped the *newest* byte rather than overwriting the oldest, by checking exactly which data survived.

## The point

It would be faster to blink the LED, see it blink, and move on. But "it looked right" is how bugs ship — the peripheral that works at -O0 and breaks at -O2, the buffer whose overflow policy is the opposite of what you think, the signal that isn't where you assume it is. The only defense is to prove the mechanism, not the output — and to keep a list of the things you turned out to be wrong about.
`.trim(),
  },
  {
    slug: "my-benchmarks-were-lying",
    title: "My benchmarks were lying to me",
    date: "2026-08-04",
    summary:
      "The hardest part of my caching proxy wasn't building it four ways. It was finding out my measurements were wrong — and using a queuing-theory law to prove it.",
    content: `
I'd built my caching proxy four different ways and benchmarked them all. Clean tables, a nice conclusion, done. Then an experienced reviewer looked at my setup and, politely, took it apart. The numbers were wrong — not by a little, and not because the code was broken. Because the *measurement* was.

That correction taught me more than the whole build did.

## Three things contaminating everything

**The load generator was on the same box.** I was running \`wrk\` (the thing generating load), the proxy, and the origin server all on the same 4-core Raspberry Pi — so they were fighting each other for CPU. Every cross-architecture comparison was polluted by that contention. The fix: move \`wrk\` onto a separate laptop, wired to the Pi over Ethernet, and verify the link (1000-ping flood, 0% loss, ~0.3ms).

**The origin was the real bottleneck.** My origin server was Python's built-in \`http.server\`, which is single-threaded and tops out around 1,500–2,400 req/s. So every cache-*miss* number I'd reported wasn't measuring my proxy at all — it was measuring how fast Python could serve. I swapped in nginx.

**Connections closed after every request.** My server spoke HTTP/1.0-style: open, respond, close. Over a real network that means a full TCP handshake *per request*, which dominates the measurement. Adding HTTP/1.1 keep-alive dropped single-connection latency from ~1.8ms to ~400µs — the handshake had been most of what I was timing.

## The law that caught it

Here's the part I'm proudest of. How do you know your numbers are wrong without already knowing the right answer?

**Little's Law.** It says, for a stable system, average concurrency = throughput × average latency. Rearranged: latency = concurrency / throughput. At 50 connections and 62,304 req/s, that predicts an average latency of 50/62304 ≈ **802µs**. My corrected measurement was **793µs** — they reconcile. My *original* numbers were off by 3–14×, and that mismatch was the tell: they described a system that couldn't physically exist. The law is what let me trust the second set of numbers and distrust the first.

## What I actually took from it

The lesson isn't a fact about caching. It's a habit: **don't trust a benchmark until you've proven it's physically consistent.** A number that looks clean can be measuring the wrong thing entirely — your load tool, your origin, your handshake overhead — and the only defense is controlling your variables and sanity-checking against something that has to be true.

I'd rather ship the corrected, uglier, honest numbers than the clean wrong ones. That's the whole point of measuring at all.
`.trim(),
  },
  {
    slug: "fastest-is-the-wrong-question",
    title: "\"Fastest\" is the wrong question",
    date: "2026-08-01",
    summary:
      "Part 4: I built an epoll event loop like nginx uses, benchmarked all four architectures head-to-head, and found that the server with the highest throughput was also the worst one to actually run.",
    content: `
This is the last part of the proxy arc, and it's the one that changed how I think about performance. Parts 2 and 3 were about threading — thread-per-connection, then a thread pool. Part 4 asks: what if you stop mapping connections to threads at all?

## The event loop

That's what an epoll event loop does, and it's how nginx actually works. One thread, non-blocking sockets, and an event loop that reacts as each socket becomes ready. On a cache miss, the proxy opens a *second* non-blocking socket to the origin and drives both the client and origin connections through a single state machine — so no thread ever sits blocked waiting on I/O. One thread, no per-connection cost, no locks.

I recompiled all four servers under identical conditions and benchmarked them head-to-head.

## The result that reframed everything

Here's what got me: **single-threaded had the highest raw throughput** at low concurrency — it beat even epoll. Zero threads, zero locks, zero event-loop bookkeeping, so at low load the simplest design just wins.

And that number is a trap.

Because single-threaded's throughput hides catastrophic tail latency. At 50 connections it showed ~22ms average — but a **1.7-second** worst case, and timeouts at every level past 10 connections. A few requests scream through while others starve to death, and the *average* quietly conceals it. If you'd picked your architecture off the throughput column alone, you'd have shipped the worst possible server.

The thread pool and the event loop trade a little peak throughput for enormous stability: sub-millisecond average latency and single-digit-millisecond worst case at the same concurrency, versus single-threaded's 1.7 seconds. The pool had zero timeouts at every level. epoll gave the best overall balance — strong throughput, excellent latency, best miss-path performance — on one thread.

## What I actually learned

There is no single "fastest" architecture. It depends entirely on what you optimize for, and **raw throughput is a misleading metric**. The reason production servers use event loops isn't that they're fastest — it's that at scale, *predictable latency* matters more than peak throughput, and the event-driven model delivers it without a thread per connection.

The whole lesson of this project, in one line: **"fastest" is the wrong question.** Tail latency and stability under load are what actually separate these designs — and you only see it when you stop staring at the headline number and look at what it's hiding.

That's the end of the arc. Built it, broke my assumptions, and learned to distrust the number I started out chasing.
`.trim(),
  },
  {
    slug: "the-thread-pool-measured",
    title: "The thread pool, measured",
    date: "2026-07-27",
    summary:
      "Part 3: I built the fix I'd diagnosed, proved it worked, then swept worker counts and found the tuning curve. The lesson isn't 'more threads.'",
    content: `
This is the end of the arc. Part 1 built a caching proxy in C and measured ~29× more throughput on cache hits. Part 2 found that the *obvious* improvements were wrong — LFU collapsed the hit rate, and thread-per-connection was a tradeoff, not a win. Part 3 is today: I built the fix I'd diagnosed, proved it, and tuned it.

## The fix: a thread pool

Thread-per-connection failed because you pay to spawn a thread on *every* request — overhead that swamps a CPU-cheap cache hit. A thread pool fixes that: a fixed set of worker threads pull connections off a shared queue, so you get parallelism without the per-request creation cost.

The interesting part is the concurrency correctness. The queue is guarded by a mutex and a condition variable, and there are a few traps I had to get right: wait in a \`while\` loop, not an \`if\` (spurious wakeups are real); do the \`close()\` *outside* the lock (never hold a mutex across I/O); and store the client FDs by value, not by pointer into a buffer that moves. Get one of those wrong and it works fine — until it deadlocks or corrupts under load.

It worked. The pool beat thread-per-connection at every concurrency level, kept the miss-path parallelism (~47% over single-threaded), and overtook the single-threaded server once real concurrency (100+ connections) made the single accept loop the bottleneck.

## The tuning curve

The Pi has 4 cores, so the naive guess is "4 workers." I swept 4 → 64 and measured:

Throughput *climbed past* 4 workers, kept climbing, peaked around **32**, then **collapsed at 64** — falling back to single-threaded numbers with 5× the timeouts.

That shape is the whole lesson. It climbs past the core count because the work is I/O-bound: workers spend most of their time *blocked* waiting on the origin, not using CPU, so oversubscribing cores is correct — up to a point. Past the peak, scheduling overhead, lock contention, and origin saturation overwhelm the gains, and more threads actively hurt. Tail latency degrades well before throughput peaks, so the practical sweet spot (~16 workers) is below the raw-throughput peak.

## What I actually learned

The one-line version: **optimal concurrency for I/O-bound work exceeds the core count, but is bounded by the downstream bottleneck** — and past the peak, more threads make it worse.

I could have read that in a textbook. Building it, measuring it, and watching my own proxy trace that exact curve on real hardware is the difference between knowing it and *knowing* it. That's the whole reason I did this project the long way.
`.trim(),
  },
  {
    slug: "when-the-obvious-fix-is-wrong",
    title: "When the obvious fix is wrong",
    date: "2026-07-12",
    summary:
      "I measured my caching proxy instead of assuming. Threads made it slower. LFU collapsed. Both taught me more than the 29x number did.",
    content: `
Last post, my caching proxy worked and I had one number: ~29× more throughput on cache hits than origin fetches. Good headline. But the interesting part came after, when I started changing the design and *measuring* instead of assuming — and twice, the obvious improvement made things worse.

## Threads made it slower (sometimes)

The obvious next step for a single-threaded server is: add threads. So I gave each connection its own thread and benchmarked it.

It was a tradeoff, not a win. For cache **hits** — which are CPU-cheap, just an in-memory lookup — threads were *slower*: the overhead of spinning one up dominates the tiny amount of actual work. For cache **misses** — which sit around waiting on the origin — threads were ~35% faster, because those waits now happen in parallel instead of one at a time.

So "add threads" isn't right or wrong; it depends on whether your work is CPU-bound or I/O-bound. The real fix is a thread *pool* — reuse a fixed set of threads so you get the parallelism without paying the creation cost every time. I wouldn't have known which way it cut without measuring both.

## LFU looked smarter and collapsed

My cache evicts with LRU — drop the least *recently* used entry. LFU — drop the least *frequently* used — sounds smarter: keep what's popular, not just what's recent.

Under a workload where popularity drifts over time, LFU's hit rate collapsed to ~9.5%. LRU held ~75%.

The reason is the mechanism: LFU counts frequency, and old counts become permanent baggage. Something that was hot early builds a high count and refuses to leave, even after nobody wants it anymore — so it squats in the cache while genuinely useful new entries get evicted. LRU has no memory of the past beyond "was this touched recently," which turns out to be exactly the right kind of forgetting.

## The actual lesson

Neither of these is in the code — they're in the *measuring*. The 29× number showed the proxy works. These two showed me something more useful: the intuitive choice is often wrong, and the only way to know is to build it, break it, and understand *why* it broke.

That's the part I actually care about. Next up: the thread pool.
`.trim(),
  },
  {
    slug: "a-proxy-on-real-hardware",
    title: "A proxy on real hardware",
    date: "2026-07-11",
    summary:
      "In one session I took a caching reverse proxy from a sealed Raspberry Pi box to forwarding live traffic in C. Next up: the numbers.",
    content: `
My Raspberry Pi 5 arrived today. By the end of the session, it was running a caching reverse proxy I wrote in C — forwarding and caching live traffic on real hardware.

## What I pulled off, start to finish

- Set up a headless Pi 5 from a sealed box — including debugging a boot failure and some network-discovery pain
- Built the complete core of a caching reverse proxy in C: a hash table, LRU eviction, a socket server, and origin forwarding
- Got it actually forwarding and caching live traffic on the hardware
- Set up a proper remote dev workflow and version-controlled everything to GitHub

Going from a sealed box to a working networked system in C, on real hardware, in a day felt good.

## The honest part: no numbers yet

Here's the thing I could fudge but won't — I don't have metrics yet. I have a system that *works*, not one I've *measured*. And those are two very different sentences.

What I can say today:

> "I built a caching reverse proxy in C — hash table with LRU eviction, socket server, origin forwarding — running on a Raspberry Pi 5."

That's already real. It shows I can build a networked system in C from scratch on actual hardware.

What I'll be able to say after benchmarking:

> "...and I measured it — cache hits served at X requests/sec versus Y for origin misses, roughly a Z× throughput improvement under concurrent load."

That second sentence is the one that lands, because it's the difference between *building* something and *reasoning about how it performs*. Throughput, latency, hit rates — that's the actual language of the work I want to do.

## Next

Benchmarking. The fun part, where the proxy stops being "it works" and becomes "here's the number." That's the session that makes this whole thing quotable — and I'd rather show up with the number than the adjective.
`.trim(),
  },
  {
    slug: "making-it-look-legit",
    title: "The unglamorous part",
    date: "2026-07-11",
    summary:
      "A custom domain, link previews, and SEO — the invisible work that makes a site feel real.",
    content: `
Most of the work that makes a site feel legit is invisible. This week I did the boring, important layer: a real domain, link previews, and search metadata. None of it changes how the site *looks* — but all of it changes how it lands.

## What I actually did

**A custom domain.** The site now lives at its own address instead of a random \`.vercel.app\` URL. Ten dollars a year, and it reads a whole tier more professional on a resume or a recruiter DM.

**Link previews.** Paste the link into Discord or LinkedIn now and a proper card shows up — my name, what I do, my site's look. It's generated from code, so it always matches the rest of the site. Before, a shared link looked broken. Now it looks intentional.

**SEO metadata.** A real description, keywords, and the tags that let Google actually index the page. When someone searches my name, I want the right thing to come up.

## The catch

None of it was hard, exactly — but it was fiddly, and I broke the build twice getting there. Once from a re-export the framework didn't allow, once from accidentally deleting a chunk of a file I was only meant to edit.

Both times, the same move fixed it fast: read the error, it names the file and line, fix that one thing.

## The takeaway

This layer is easy to skip because you can't see it. But it's the difference between a link that looks like a real person's site and one that looks like a school project. Worth the boring afternoon.
`.trim(),
  },
  {
    slug: "what-counts-as-experience",
    title: "What counts as experience",
    date: "2026-07-10",
    summary:
      "I almost left my best experiences off my portfolio because they weren't 'engineering enough.' I was wrong.",
    content: `
When I sat down to add an experience section to this site, my first instinct was to cut most of it. A robotics club, sure — that's engineering. But a lifeguard job? Running a club's Instagram? Tutoring? Those didn't feel like they belonged on a *portfolio*.

I was wrong, and figuring out why was the actual lesson.

## The stuff I almost cut

Here's what I nearly left off: lifeguarding, tutoring math and physics, managing social media for a school club, and — this is the embarrassing one — a scholarship I'd been thinking of as "just financial aid."

That scholarship, the Science '59 Admission Award, was awarded for academic excellence, *leadership*, and community involvement. I'd been quietly filing my single most competitive credential under "money stuff" instead of recognizing it for what it was.

And it mattered more because of where I started. I didn't come from wealth — no inheritance, no safety net. For students like me, an award like this isn't a nice-to-have; it's part of what makes the door open at all. Undervaluing it said something about how I saw myself, and correcting that was its own kind of growth.

The pattern was the same across the rest. Tutoring isn't "not engineering" — it's proof I can explain hard technical things to someone who's stuck, which is half of what engineers actually do. Lifeguarding isn't filler — it's holding real responsibility for people's safety through long, boring shifts where staying alert is the whole job. Running a club's socials is turning an announcement into people actually showing up.

None of that is code. All of it is real.

## The one I want to talk about

There's one role on that page I care about more than the rest: I'm the Mental Health Steward for Computer Engineering at my school, and I hold it until I graduate.

The job is simple to describe and easy to underrate. It's about making it normal to talk about how you're doing, and knowing where to point someone when they need more than a conversation. Most of it is just *mental health literacy* — knowing the signs, knowing the resources, and being a person who's safe to talk to.

I think roles like this matter because the hard part of a bad week is rarely the week itself — it's that people don't reach out. Engineering programs are stressful in a way that quietly normalizes not being okay. Having someone whose actual job is to check in, and to make "how are you, really?" a normal question, changes that a little.

So here's the least technical thing I'll ever put on a coding blog: check in on your people. The friend who went quiet, the one who's "just busy," the one grinding a little too hard. It costs you a text. You don't need a title to do it — I just happen to have one.

## The takeaway

A portfolio isn't only a list of things you built. It's evidence of who you are — how you lead, how you show up, what you've been trusted with. The projects prove I can build. The experience proves the rest.

Don't undersell the parts of yourself that aren't code. They might be the most important things on the page.
`.trim(),
  },
  {
    slug: "building-this-site",
    title: "What building this site actually taught me",
    date: "2026-07-09",
    summary:
      "I set out to add a few things to my portfolio. What I actually learned was how to debug.",
    content: `
I started with a simple goal: put my projects online. What I didn't expect was that the building would be the easy part, and everything *around* it — git, deploys, moving files — would be where the real learning happened.

Here's what I added: five projects, screenshots, a working contact form, this Notes section, a "now" page, and a resume link. None of that was the hard part.

## The hard part

The bugs were the hard part, and they were rarely where I expected.

At one point I had *two copies* of my project on my laptop — one connected to git, one not — and couldn't figure out why my changes weren't showing up. I'd been editing the wrong folder.

Later, my updates kept not deploying even though every push "succeeded." Turns out a file was silently landing in the wrong place, so I was committing the old version over and over. The commit worked; the content was wrong. That one cost me a few rounds before I thought to actually *check what was in the file* instead of trusting that the commit did what I meant.

And a single stray \`=\` character at the top of a file broke an entire build. One character.

## What I'd tell myself at the start

Two things.

**Build locally before you push.** Running the build on my own machine catches errors in seconds. Pushing and waiting for the deploy to fail catches them in minutes, publicly. Green locally means green live — I proved it to myself enough times to trust it.

**Verify, don't assume.** When something "won't update" no matter how many times you push, stop pushing and go look at what's actually in the file. A commit succeeding doesn't mean it committed what you think.

## The Now page is the human part

There's one page here that isn't about code at all: the [Now page](/now). It's there because a portfolio can start to read like a spec sheet, and I'm more than one. I have thoughts, interests, and things I'm into this month — and I actually update it as they change.

So you'll find my current rotation there: Cyberpunk 2077 (hi, Johnny Silverhand), Friends (Thank you, Matthew Perry, for your sarcasm on the show), Lord Huron (yes, *that* song from 13 Reasons Why), and Fahrenheit 451 (whose themes feel a little too relevant lately). That mix probably says more about me than any project does.

The building taught me some things. The debugging taught me more. And the Now page is there to remind you there's a person behind all of it.
`.trim(),
  },
  {
    slug: "hello-notes",
    title: "Starting a notes section",
    date: "2026-02-14",
    summary:
      "Why I'm keeping a build log alongside the projects — and what I plan to write about.",
    content: `
I kept the projects on this site short on purpose — a blurb, a stack, a link. But the interesting part of building something is rarely the finished result. It's the wrong turns, the thing that took three hours to debug, the small realization that changes how you approach the next one.

So this is where that goes. **Notes** is a running log of what I'm learning while I build.

## What I'll write about

Mostly the stuff I wish someone had written down for me:

- Debugging sessions that taught me something non-obvious
- Decisions I made and whether they held up
- Small wins that felt bigger than they were

## Why bother

Writing something down forces you to actually understand it. If I can't explain why a fix worked, I probably got lucky rather than learning. These notes are the difference between the two.

First real post coming soon — likely about the [HTTP caching proxy](/projects/caching-proxy) I'm building in C.
`.trim(),
  },
];

// ── Helpers (you probably won't need to edit below this line) ────────────────

// Posts sorted newest-first by date.
export function sortedPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function allPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}

// Format an ISO date like "2026-02-14" as "February 14, 2026".
export function formatDate(iso: string): string {
  const date = new Date(iso + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
