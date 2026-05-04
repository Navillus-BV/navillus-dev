---
title: The case for boring tech, five years later
description: Five years ago we wrote that the boring tools make your life easier in the long run. Here's what held up, what didn't, and why it matters more now.
social_image:
  src: '../../assets/uploads/share.png'
  alt: The case for boring tech, five years later
date: '2026-05-04T12:00:00Z'
tags:
  - simplicity
  - longevity
published: true
author: tony-sull
---

Almost five years ago we published [The power of simplicity](/blog/power-of-simplicity), arguing that "the boring tools make your life easier in the long run." We'd just rebuilt the site on [Astro](https://astro.build) and [Forestry CMS](https://forestry.io) and were feeling pleased with ourselves about it.

Forestry got wound down by its own team. Half the JavaScript ecosystem we name-checked is on a different version, deprecated, or quietly forgotten. The "Jamstack" branding has folded back into the rest of the web.

So how did the thesis hold up?

**tl;dr;** Better than we expected, and for reasons we mostly didn't predict. The boring stuff outlasted the shiny stuff. We were also wrong about who the post was for.

## What aged well

The list of "old, boring tools" we cited (JSON, git, markdown, HTML, CSS, JavaScript) is exactly the same list we'd cite today, with the same versions still in widespread use. Nobody has had to relearn how to write a `<form>` tag.

A few additions to the boring-tech canon since:

- **Postgres** is more entrenched than ever. The five-year-old startup using it is still using it. The hot new managed-Postgres service that launched in 2022 has since been acquired by another managed-Postgres service that launched in 2024.
- **SQLite** quietly took over half the small things we build. It runs at the edge, it ships inside the binary, it backs single-user apps and multi-tenant ones, and it's still a single file you can copy.
- **Astro**, which we called "shiny new" in the original post, is now five years old and behaves like the boring tools: backwards-compatible upgrades, slow API churn, content collections that haven't broken twice.

The pattern is the same one we noticed in 2021: tools that don't make you relearn them every year tend to compound. Tools that do, don't.

## What didn't survive

The Forestry team rebuilt their product as TinaCMS, which is tied to React, and wound the original CMS down. Snipcart got acquired by Duda back in 2021 and isn't the standalone story it used to be. Gatsby went from one of three default React choices to a footnote. The serverless-backend startup we evaluated in 2021 is gone; the one that replaced it is being acquired; the one that's replacing _that_ is making the same architectural promises in a slightly different colour scheme.

We're not gloating. We picked Forestry. We were wrong. The lesson isn't "we predicted this." It's that the cost of being wrong about a vendor was much higher than the cost of being wrong about a framework. Migrating from Astro to Eleventy is a weekend's work. Migrating off a deprecated CMS is a re-platform.

## What we got wrong

Two things, mainly.

**We wrote the post for developers.** That made sense in 2021. We were in a Twitter thread loop with other devs about Jamstack architecture. Five years on, the argument matters even more for the people who _aren't_ developers: the small business owner whose site keeps breaking after WordPress updates, the nonprofit director whose previous developer disappeared and took the deployment credentials with her. They don't have the option of "I'll just learn the new framework." For them, boring tech isn't an aesthetic preference. It's the only honest answer to "will this still be running in five years."

**We undersold the human side.** The original post celebrated long-lived tech without addressing the social problem: who maintains it after you leave? "Boring" isn't valuable because it's old. It's valuable because the next person can pick it up. Postgres is boring because millions of developers know it. HTML is boring because every browser implements it. A weird stack is "interesting" right up until the day you need to hand it off, at which point it's a liability.

## What changed since

A few things genuinely shifted.

**AI writes a lot of code now.** We use it. It doesn't change the boring-tech argument. If anything, it sharpens it. AI is excellent at reading and writing well-trodden patterns: plain JavaScript, Postgres queries, a basic Astro page. It struggles with bespoke architectures, custom DSLs, and the tangled middleware of a 15-plugin WordPress install. The cheaper AI gets at maintaining your code, the more you should write code AI can read.

**The web platform caught up.** A lot of what required a framework in 2021 now ships in the browser: view transitions, the popover API, native dialogs, container queries. The ratio of "HTML you write" to "framework you wrap it in" keeps tilting toward HTML. Good.

**Edge and serverless settled.** The "should I deploy to 27 regions or 3?" debate quieted down. Most small sites and most internal tools want one good region, sometimes a CDN, sometimes a worker at the edge for one specific job. Almost nobody actually needs the architectural complexity that was being sold as table stakes.

## Why this matters more for our clients

Five years ago we were writing for ourselves. Today we build websites and internal tools for [small businesses and non-profits](/), and the stakes are different.

A nonprofit running on a $30/month hosting bill cannot afford a year of refactoring to chase a framework deprecation. A community center whose donor data lives in a Retool dashboard does not need a microservices migration. The local business whose website does seven things does not benefit from a stack that could theoretically scale to seven million.

For them, "boring" isn't conservative. It's competent. It's the difference between a website that costs $0 to leave running and one that quietly accumulates a $400/month SaaS bill nobody can explain.

## What still holds up

The closing line of the original post was: _"There's always a new tool to try or pattern to learn, but at the end of the day it's much more satisfying to ship a product rather than trying out a new tool."_

That still stands. We'd add one thing: ship a product _that the next person can pick up without you._ Not because they will, but because if they have to, the project survives.

That's what boring tech actually buys.
