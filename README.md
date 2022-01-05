# jmarkd
*simple markdown editor*

## Features
1. Markdown
2. Toolbar with API
3. Preview

## Requirements
1. **Browser environment**
2. **Modern browser**

## Getting started
1. install: ```npm install @oklookat/jmarkd```
2. use:
```html
<div class="container"></div>
```
```javascript
import jmarkd from '@oklookat/jmarkd'
import '@oklookat/jmarkd/styles'

const el = document.getElementsByClassName('container')[0]
const config = {
    container: el
}
const editor = new jmarkd(config)
```

## Config & methods
**see src/types.d.ts file**

## Factory toolbar items
**see src/factory dir**

## Icons (licenses)
**modifications: resolution changed for all icons.**

**Heading, Italic**

https://github.com/oklookat
(CC0 License)

**Eye, Strikethrough, Link, Image, Anchor**

https://www.svgrepo.com/
(CC0 License)

**Code**

https://uxwing.com/

**Bold**

https://github.com/primer/octicons

```
MIT License

Copyright (c) 2021 GitHub Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**Quote**

https://github.com/twbs/icons

```
The MIT License (MIT)

Copyright (c) 2019-2021 The Bootstrap Authors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
