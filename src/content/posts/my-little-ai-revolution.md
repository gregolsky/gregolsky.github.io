---
title: "My Little AI Revolution"
description: "How a Claude subscription gave me back the ability to build things I never had time or energy to start — and what that means for this blog."
pubDate: 2026-04-19
tags: ["ai", "claude", "productivity", "personal"]
cover: "../../assets/articles/ai-revolution.png"
coverAlt: "My Little AI Revolution"
draft: false
---

I've been a software developer for over 15 years. At work I lead a team, ship code, and know what good architecture looks like — what tools to reach for, how to set up a CI pipeline, how to migrate a codebase to a modern stack. But this post isn't about my day job. It's about the pile of personal pet projects — this blog included — that I'd been wanting to build for fun and profit, and that sat untouched for years even though, technically, I knew exactly how to build every one of them. The knowledge was never the problem.

The problem was the *entry level*.

## The Activation Energy Problem

Every meaningful personal project starts with a mountain of setup before you get to the part you actually care about. A new blog redesign? That's: pick a static site generator, learn its quirks, configure Tailwind, wire up content collections, migrate old posts, set up GitHub Actions, handle legacy URL redirects, add RSS, optimize images... The list goes on before you've written a single word.

After a full day of work — leading a team, reviewing pull requests, thinking about architecture — I'd sit down in the evening and open a blank editor. The mountain was still there. And I'm a father of four. The spare hours are not exactly plentiful.

So the project would wait. And wait. And wait. This blog last saw an update in 2016.

## Enter Claude

Think of Mr. Meeseeks from *Rick and Morty*. You press the button, a Meeseeks pops into existence, laser-focused on your one task, and once it's done — poof, gone. No context baggage, no ongoing maintenance, no feelings about the codebase. Just: *"I'm Mr. Meeseeks, look at me! Wanna set up a Tailwind config?"*

That's closer to how using Claude feels than the sci-fi "AI takes over your job" narrative. You summon it for a specific thing, it helps you knock it out, and you stay in the driver's seat. The difference is Meeseeks starts to suffer if the task drags on. Claude also starts to suffer — just more quietly. As the context window fills up, it starts hallucinating, losing track of earlier decisions, contradicting itself. The trick is knowing when to start a fresh conversation rather than dragging one session past its limits.

There's a second analogy, more personal. A few weeks ago my wife was on duty and I was home alone with all four kids. We needed to get the shopping done before the weekend, so I took them with me. At the entrance I split the list: *you go find oil, you grab cocoa, you get tomatoes, you find carrots*. They scattered into the aisles. A few minutes later they converged back on me, each with their item, ready for the next thing — sometimes hallucinating chocolate cookies. We had the whole list in the basket in no time. At the checkout each of them picked up a bag to carry home.

That's sub-agents. Claude Code can spin up multiple agents in parallel — one reads the codebase, one searches for patterns, one drafts an implementation, one runs the tests. They go lurking, then report back. You stay at the basket. The coordination is still yours, but the legwork is distributed.

Earlier this year I got a personal Claude subscription. And something shifted.

Not because Claude writes perfect code (it doesn't, always), or because it replaces thinking (it doesn't). But because it collapses the activation energy. I can describe what I want, see a working scaffold in minutes, iterate on design decisions conversationally, and skip the part where I spend two hours reading documentation for a tool I'll use once.

The setup overhead that used to kill my motivation? It's gone. Or at least, dramatically reduced.

## This Blog Is the Example

The site you're reading right now was rebuilt from scratch in a weekend — evenings, after the kids were in bed. The old version was hand-minified HTML, jQuery 1.11, pre-built CSS, and four articles frozen in 2016. No build system, no markdown, no image optimization. A project I'd been meaning to modernize for years.

The new stack: Astro 4, Tailwind CSS, MDX content collections, GitHub Actions deploy, automatic image optimization, responsive layout, RSS feed, legacy URL redirects. The hero background is a photo I took of the brutalist UMK building in Toruń, reflected in a foggy pond. There's a Conway's Game of Life animation running in the header that you can interact with.

I designed it, directed it, reviewed it, and pushed it to production. Claude handled the bulk of the scaffolding and implementation. The result is something I'm genuinely happy with — and it took a fraction of the time I would have needed flying solo.

## What This Means Going Forward

The activation energy barrier isn't just lower for me — it's lower for a whole class of projects that used to live in the "someday" folder.

Side projects that required too much setup to feel worthwhile. Tools I wanted to build but never started. Blog posts I had thoughts for but never sat down to write (this one included).

I can't promise a weekly cadence. Four kids and a full-time job don't negotiate. But the blog is alive again, the foundation is solid, and the excuse of *"it would take too long to set up"* no longer holds.

In just the last two weeks I've already shipped 3–4 small projects that would have sat in the "someday" pile indefinitely. I'll be writing about each of them in the next posts.

My GitHub commit history says the rest — the start of 2026 is noticeably busier than the years before it.

![GitHub activity chart — start of 2026 looks noticeably busier](/images/gh-activity.png)

Expect more updates.
