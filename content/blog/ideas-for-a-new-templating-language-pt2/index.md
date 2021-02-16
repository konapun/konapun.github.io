---
title: "Ideas For a New Templating Language Part 2"
date: "2020-12-4T22:19:15Z"
description: "Designing a syntax for an extensible target language"
tags: ["dev notes"]
---

Continuing in the stream of consciousness brainstorming session that was [Part 1](), I will examine what a syntax might look like for the language described. To drive and evaluate
my decisions, I'll use the following criteria:

  * Coupling to atomic ideas in the client API (this is the API which acts on the compiled template created via Cactus directives)
  * Expressiveness
  * Ability to handle unforseen use cases

To begin, here is a snippet of a hypothetical tmux config:
```
# @cactus section show-status-bell begin
# @cactus variable window-status-bell-style-bg {extract-from: 'colour9' | validate-color}; variable window-status-bell-style-fg {extract-from: 'colour235' | validate-color}
set-window-option -g window-status-bell-style bg=colour9,fg=colour235 # bg=red, fg=bg
# @cactus end
```

The uncommented configuration, which I'll refer to as the "realized" portion,
