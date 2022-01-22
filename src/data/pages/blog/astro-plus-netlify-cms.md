---
title: Astro + Netlify CMS
description: Static sites powered by a git-based CMS, made easy.
social_image: '/uploads/2021-06-23-astro-plus-netlify-cms.jpg'
date: '2021-06-23T17:31:26Z'
last_modified_at: ''
tags:
  - astro
  - cms
permalink: '/blog/astro-plus-netlify-cms'
published: true
blocks: []
tweet_id: '1407792706546458625'
author: src/data/authors/tony-sull.json
---

I like markdown as much as the next developer, but it's easy to forget how convenient a CMS can be. For personal projects or internal tools, though, I can't justify reaching for a full headless CMS setup. Configuration takes time and, more importantly, for Jamstack sites it can be a huge time saver to have the entire CMS alongside the source code right in `git`.

**tl;dr;** Check the [live demo](https://demo-astro-netlify-cms.netlify.app/) or dive right into the code on [Github](https://github.com/Navillus-BV/demo-astro-netlify-cms).

## The power of a git-based CMS

We're huge fans of the git-based CMS idea at Navillus. When the entire site is built to be deployed as a static site it really doesn't make much sense to need to pull from a remote server to load content, and you're already working in `git`!

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Our go-to content solutions:<a href="https://twitter.com/NetlifyCMS?ref_src=twsrc%5Etfw">@NetlifyCMS</a> for internal projects (when we just need it to work)<a href="https://twitter.com/forestryio?ref_src=twsrc%5Etfw">@forestryio</a> for client projects (when a clean, user friendly UI is a must)<a href="https://twitter.com/fauna?ref_src=twsrc%5Etfw">@fauna</a> (when a file based CMS just won&#39;t cut it)<br><br>What tools are you always reaching for?</p>&mdash; Navillus (@navillus_dev) <a href="https://twitter.com/navillus_dev/status/1406690186189328384?ref_src=twsrc%5Etfw">June 20, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

For those that follow us on [Twitter](https://twitter.com/navillus_dev), today's blog post won't be much of a surprise. Netlify CMS is the first content management tool we reach for on side projects and internal tools. It's dead simple to setup and deploy, and is deployed alongside our site as static HTML. And before you as, yes we are loading the admin panel's JS bundle from a CDN but you can actually install that via NPM if you prefer.

## Before we begin

This demo is based on the excellent [eleventy-netlify-boilerplate](https://github.com/danurbanowicz/eleventy-netlify-boilerplate) demo. If you're interested in [11ty](https://11ty.dev) as well, I strongly recommend you take a look at that repo to learn best practices when setting up an 11ty project!

## The basic setup

Our goal today is to highlight the Astro-specific details when integrating with Netlify CMS, so I won't be diving too far into the initial setup. Check out [Netlify CMS's](https://www.netlifycms.org/docs/add-to-your-site/) excellent docs for adding the CMS to your own site for a quick rundown.

For this demo, I decided to load the `netlify-cms` library from CDN, but as mentioned [in the docs](https://www.netlifycms.org/docs/add-to-your-site/#installing-with-npm), you can install from NPM instead. In that case, [Snowpack](https://www.snowpack.dev/) will handle bundling the JS in production builds.

When including `/admin/index.html` and `/admin/config.yml`, you can simply copy those files from the docs to your Astro project's `/public` folder. Astro includes everything in the `/public` directory as static assets, for example your `/public/admin/index.html` file will be available when navigating to `yoursite.com/admin`.

## Demo blog posts

First thing's first, lets setup support for blog posts.

### Configuring blog posts in the CMS

Once you have the CMS and Netlify Identity all setup, it's time to start adding content. If you take a look at our demo repo, you'll see that all of the blog posts are saved to the [/src/pages/posts](https://github.com/Navillus-BV/demo-astro-netlify-cms/tree/main/src/pages/posts) directory.

For Netlify CMS, The key is to make sure that your `config.yml` is pointing to the correct folder.

```yaml
collections:
  # Our blog posts
  - name: 'blog' # Used in routes, e.g., /admin/collections/blog
    label: 'Post' # Used in the UI
    folder: 'src/pages/posts' # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: '{{slug}}' # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - { label: 'Title', name: 'title', widget: 'string' }
      - { label: 'Publish Date', name: 'date', widget: 'datetime' }
      - {
          label: 'Author',
          name: 'author',
          widget: 'string',
          default: 'Anonymous',
        }
      - { label: 'Summary', name: 'summary', widget: 'text' }
      - { label: 'Tags', name: 'tags', widget: 'list', default: ['post'] }
      - { label: 'Body', name: 'body', widget: 'markdown' }
```

In this excerpt from the demo's `config.yml`, note that `folder` is pointing to the correct directory.

### Loading and rendering in Astro

Loading local data is handled with the [Astro.fetchContent](https://github.com/snowpackjs/astro#-fetching-data) API.

```js
export let collection: any

export async function createCollection() {
  return {
    /** Load posts, sort newest -> oldest */
    async data() {
      const allPosts = Astro.fetchContent('./posts/*.md')
      return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
    },

    /** Set page size */
    pageSize: 10,
  }
}
```

That's really all there is to it! The `fetchContent` API takes care of loading all matching markdown files. I left out RSS feed support here for brevity, but you can find that in the demo repo [here](https://github.com/Navillus-BV/demo-astro-netlify-cms/blob/main/src/pages/%24blog.astro).

```astro
<Layout {title} {description}>
  <h1>{title}</h1>

  {collection.data.map((post) => <PostPreview post={post} />)}
</Layout>
```

Here the `$blog.astro` template is taking the data loaded above and rendering a list of post previews. If you have experience with React (or JSX) this will feel very familiar. Brackets `{}` are used to escape plain old JS into the template, mapping over the posts loaded in `data()` and passing the data of to the `PostPreview` component.

#### What about individual blog posts?

Take a look at one of the sample [blog posts](https://github.com/Navillus-BV/demo-astro-netlify-cms/blob/main/src/pages/posts/firstpost.md) in the demo repo. It defines the template used to render a blog post in frontmatter, just like you may have used in [11ty](https://11ty.dev), [Jekyll](https://jekyllrb.com/), or really any other static site generator out there.

## Caveat, Astro is in beta!

Astro is still in beta and one of the big updates coming down the pipe is an update to [dynamic routing](https://github.com/snowpackjs/astro/issues/80). We'll skip past the routing setup for now as that may very well change in the near future, but feel free to poke around in the [demo repo](https://github.com/Navillus-BV/demo-astro-netlify-cms) or ask us questions on [Twitter](https://twitter.com/navillus_dev)!

I won't go into detail here on how `/author/:id` or `/tags/:tag` routes for now, but keep an eye out for a follow-up blog post once the routing APIs are finalized!
