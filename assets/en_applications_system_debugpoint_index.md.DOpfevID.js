import{_ as e,c as n,al as a,o}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"debugpoint Debug Utility","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/system/debugpoint/index.md","filePath":"en/applications/system/debugpoint/index.md"}'),d={name:"en/applications/system/debugpoint/index.md"};function i(s,t,r,p,c,u){return o(),n("div",null,t[0]||(t[0]=[a(`<h1 id="debugpoint-debug-utility" tabindex="-1"><code>debugpoint</code> Debug Utility <a class="header-anchor" href="#debugpoint-debug-utility" aria-label="Permalink to &quot;\`debugpoint\` Debug Utility&quot;">​</a></h1><p><code>CONFIG_SYSTEM_DEBUGPOINT=y</code></p><p>The <code>debugpoint</code> utility is a tool for testing and managing debug points (breakpoints and watchpoints) in the system. It allows users to set, remove, and test various types of debug points.</p><p>Usage:</p><pre><code>debugpoint [options]
</code></pre><p>Options:</p><pre><code>-r addr  Set a read watchpoint at address
-w addr  Set a write watchpoint at address
-b addr  Set a breakpoint at address
-x addr  Set a read/write watchpoint at address
-c       Cancel the watchpoint or breakpoint (must be used with -r, -w, -b, or -x)
-l len   Set the watch length (must be used with -r, -w, -b, or -x)
</code></pre><p>Examples:</p><pre><code># Set a read watchpoint at address 0x1000
debugpoint -r 0x1000

# Set a write watchpoint at address 0x2000
debugpoint -w 0x2000

# Set a breakpoint at address 0x3000
debugpoint -b 0x3000

# Set a read/write watchpoint at address 0x4000
debugpoint -x 0x4000

# Cancel the read watchpoint at address 0x1000
debugpoint -r 0x1000 -c

# Cancel the write watchpoint at address 0x2000
debugpoint -w 0x2000 -c

# Cancel the breakpoint at address 0x3000
debugpoint -b 0x3000 -c

# Cancel the read/write watchpoint at address 0x4000
debugpoint -x 0x4000 -c

# Set the watch length to 8 bytes for a read watchpoint at address 0x1000
debugpoint -r 0x1000 -l 8

# Set the watch length to 8 bytes for a write watchpoint at address 0x2000
debugpoint -w 0x2000 -l 8

# Set the watch length to 8 bytes for a breakpoint at address 0x3000
debugpoint -b 0x3000 -l 8
</code></pre><p>The <code>debug</code> utility also includes automated tests for breakpoints and watchpoints. When run without any options, it will execute these tests to verify the functionality of the debug points.</p>`,10)]))}const l=e(d,[["render",i]]);export{h as __pageData,l as default};
