---
title: Other Questions
tags: [Faq]
---

## Copy command does not work after build and deployment

The [Copy command](/en/components/copy) uses [useClipboard](https://vueuse.org/core/useclipboard/#useclipboard) to copy content to the clipboard.

### Clipboard API Compatibility

- Clipboard APIs (such as `navigator.clipboard`) are only available in some browsers when running under `HTTPS` or on `localhost`.
- If you access your site via `HTTP` after deployment, many modern browsers will disable the clipboard API, causing `isSupported.value` to be `false`.

### Recommendations

- Ensure you are using `HTTPS`: Configure your site to use `HTTPS`, as most browsers only enable the clipboard API under `HTTPS`.
- Check browser compatibility: Make sure your browser version supports the clipboard API. You can check compatibility on the [MDN](https://developer.mozilla.org/en-US/docs/Web) documentation.
- Differences between local development and production: Local development usually runs on `localhost`, where browsers relax security restrictions. In production, if not using `HTTPS`, the API will not be available.

### Temporary Solution

- If you cannot use `HTTPS` for now, consider falling back to `document.execCommand('copy')` as a compatibility solution. However, this method is deprecated and may not be available in the future.
