# Bread thread template

The Bread thread template is hosted as a small JCink component. The post contains only the editable fields and one script include; the layout, responsive rules, light and dark mode styling, member-group gradients, placeholder GIFs, and rendering logic live in this folder.

## Post code

```html
[dohtml]
<div class="bh-bread" data-gif-one="[url]" data-gif-two="[url2]" data-name="[name]">
  <div class="bh-bread-text">[text]</div>
</div>
<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread.js"></script>
[/dohtml]
```

The component uses `--mgrgb1`, `--mgrgb2`, `--mgrgb3`, and `--icon` from Blue Hour. Bold and underline use the forward member-group gradient; italics use the reverse gradient.
