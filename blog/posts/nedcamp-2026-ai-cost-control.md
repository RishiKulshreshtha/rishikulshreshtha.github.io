---
title: "NEDCamp 2026: AI talks on cost and control in Drupal"
date: "2026-11-16"
description: "Notes from five NEDCamp 2026 sessions on local models, token quotas, lean agent setups, AI governance and platform maturity, and why cost and control belong in AI design from the start."
tags: ["ai", "drupal", "community"]
keywords: ["NEDCamp 2026", "Drupal AI", "local models", "AI usage limits", "AI Metering", "AI coding agents", "AI governance", "platform maturity", "DDEV", "Git worktrees", "llms.txt", "LLMs.txt Gen", "Michael Anello", "Jacob Rockowitz", "Fredric Mitchell", "Jim Birch", "Ethan Marcotte"]
draft: false
---

At [NEDCamp](https://nedcamp.org/session-agenda) (New England Drupal Camp) on 14 November 2026, all five sessions I attended touched on AI, and the most useful asked what it costs, who controls it and who ends up better off. I maintain the LLMs.txt Gen module and build AI features for Drupal sites, and I review agent-written code as part of my daily work, so these questions come up in my own projects. My takeaway: treat cost and control as design inputs from day one, before the first invoice arrives.

In short: there are cheap ways to stay in control of AI, such as running models on your own machine, capping usage and keeping agent setups simple. They only work if the people who use the tools help decide the rules.

## Local models can handle basic authoring tasks

The cheapest token is the one you never send to a paid service. In "Drupal AI modules worth knowing about", [Michael Anello](https://www.linkedin.com/in/anello) reminded the room that Chrome has shipped with a built-in model for a while now, reachable through developer settings, and showed that Drupal can use it through the [AI Browser Provider module](https://www.drupal.org/project/ai_provider_browser). He encouraged content authors to prefer local models over paid services for everyday summarising and drafting, much like Apple's on-device approach.

I agree, with one caveat. A local model costs nothing per call and keeps content on the editor's machine, but it is a smaller model and depends on the editor's browser. For summaries and first drafts that trade is fine; for anything published without a human check, it isn't.

## Token budgets are a design choice

A budget only matters if you decide what happens when someone reaches it. Anello demonstrated [AI Metering](https://www.drupal.org/project/ai_metering), which tracks token usage, estimates cost and enforces per-user monthly quotas. Past the limit, the module can send calls to a local fallback provider such as Ollama instead of blocking the editor's request.

Choosing between blocking and falling back decides what editors experience at the limit. Block the editor and they hit a wall in the middle of their work. Fall back quietly and they keep going, but with weaker output and no idea why it changed. Whoever configures the module should pick one on purpose and tell editors what to expect.

My own module, [LLMs.txt Gen](https://www.drupal.org/project/llms_txt_gen), comes at this from the other direction. It builds llms.txt files from published nodes on cron without calling a model at all, so it costs nothing in tokens however large the site gets. The cheapest way to control AI cost is to notice which tasks actually need an LLM, and use one only for those.

## Coding agents work best with a small, predictable toolset

The same logic applies to coding agents: the less an agent has to guess, the less it costs and the less it can get wrong. [Jacob Rockowitz](https://www.linkedin.com/in/jrockowitz)'s talk, "AI ate my Work, and I'm okay with that", was mostly about that kind of control. He uses Git worktrees plus custom DDEV commands as playgrounds for agents. Each branch gets its own checkout, so he can work on several branches at once, and a bad run stays in a folder you can throw away.

Rockowitz's agent instructions avoid hardcoded paths for the same reason. They tell agents to run `ddev describe` and read values from its JSON with `jq`, so the same instructions work in every worktree. It's the piece I plan to borrow first.

When asked whether agents should use a CLI, MCP or an API, Rockowitz recommended the command line for most everyday tasks, because it is faster and lighter. When an agent needs a remote system, MCP can help, but where the service offers both, he suggested the API. There is a cost angle: every connected tool adds its description to the agent's context, so a lighter setup spends fewer tokens before any work starts.

## Governance holds when the rules live in the tools

[Jim Birch](https://www.linkedin.com/in/jimbirch/)'s "Trusted AI: Guardrails, Governance, and Proof That Your Team Still Owns the Work" treated control as a company-wide system rather than a setting. His agency scopes each proposed use of AI with four questions it calls PREP: the purpose, the risk and who it affects, the evidence that will show it worked, and the person who owns it. A "harness" then keeps the tools inside those limits:

- approved tools that don't train on company data
- instructions that cascade from global to repository to folder level
- managed settings that block secrets and production access and allow only listed MCP servers

The idea I found most useful was ownership. Each piece of AI-assisted work gets a delivery record, a YAML file naming who produced it, who reviewed and approved it, which checks ran and which model was used. It answers the question clients will ask next: who checked this?

## AI is weakening the evidence teams use to defend a budget

[Fredric Mitchell](https://www.linkedin.com/in/fredricmitchell)'s talk, "Nothing Major Broke This Year. Now, Go Defend Your Budget", looked at cost from the budget holder's side. When a platform team has a good year, there is nothing to point at. The usual fallback is traffic, and AI is eroding it. Mitchell cited [Carnegie's higher-ed search research](https://www.carnegiehighered.com/resource/higher-ed-search-engine-marketing-2026/), which found organic search's share of higher-ed website traffic fell from 46% to 35% year over year, and he connected the drop to AI overviews. So a quiet year can now look like a year of decline, even when the content is doing its job inside someone else's summary box.

Mitchell's answer is to stop leaning on traffic and score the platform itself. His free rubric, [the Web Operations Maturity Model](https://brightplum.com/blog/nothing-broke-year-now-defend-your-web-budget/), scores six areas (security, accessibility, performance, platform health, documentation and communication) from 1 (ad hoc) to 5 (managed), and recommends aiming for 4. Each team decides which evidence counts, which is control of a different kind. A chart of current against ideal state gives leadership a number to act on.

## Mature technologies move control to a few firms

[Ethan Marcotte](https://www.linkedin.com/in/ethan-marcotte/)'s keynote, "The Work We Want", gave the wider frame. He drew on [Ursula Franklin](https://aworkinglibrary.com/author/ursula-m-franklin/)'s *The Real World of Technology* and her idea that technologies pass through stages, from advocacy through adoption to institutionalisation. By the last stage the technology is an expectation rather than a choice, and control sits with a few firms.

His example was the sewing machine, promised in 1860 as freedom from drudgery, which ended up powering sweatshops. AI, he argued, is the latest round. His answer is collective: workers organising, the argument of his book [You Deserve a Tech Union](https://abookapart.com/products/you-deserve-a-tech-union).

Marcotte's argument landed uncomfortably for me, in a useful way. As someone building AI features, I take from it a test for each feature: does it give the editor more say over their work or less?

## AI limits work best when editors help set them

Across the five talks, cost was the most visible part of a bigger question about control. Every lever the speakers described, from throwaway worktrees and delivery records to spending caps, is set by someone. A token quota set by an administrator is control over editors, not control by them. The useful version lets editors know the limit, help choose what happens at it and see what they used. That is a small, local version of Marcotte's point, and it is where a developer can start.

If you run AI features in a CMS, what happens for your editors when they hit a usage limit?
