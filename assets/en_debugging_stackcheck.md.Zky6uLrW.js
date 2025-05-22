import{_ as a,c as t,al as r,o as n}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"Stack Overflow Check","description":"","frontmatter":{},"headers":[],"relativePath":"en/debugging/stackcheck.md","filePath":"en/debugging/stackcheck.md"}'),o={name:"en/debugging/stackcheck.md"};function c(l,e,i,s,h,d){return n(),t("div",null,e[0]||(e[0]=[r(`<h1 id="stack-overflow-check" tabindex="-1">Stack Overflow Check <a class="header-anchor" href="#stack-overflow-check" aria-label="Permalink to &quot;Stack Overflow Check&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>Currently NuttX supports three types of stack overflow detection:</p><p>: 1. Stack Overflow Software Check 2. Stack Overflow Hardware Check 3. Stack Canary Check</p><p>The software stack detection includes two implementation ideas:</p><p>: 1. Implemented by coloring the stack memory 2. Implemented by comparing the sp and sl registers</p><h2 id="support" tabindex="-1">Support <a class="header-anchor" href="#support" aria-label="Permalink to &quot;Support&quot;">​</a></h2><p>Software and hardware stack overflow detection implementation, currently only implemented on ARM Cortex-M (32-bit) series chips Stack Canary Check is available on all platforms</p><h2 id="stack-overflow-software-check" tabindex="-1">Stack Overflow Software Check <a class="header-anchor" href="#stack-overflow-software-check" aria-label="Permalink to &quot;Stack Overflow Software Check&quot;">​</a></h2><ol><li></li></ol><pre><code>Memory Coloring Implementation Principle

:   1.  Before using the stack, Thread will refresh the stack area
        to 0xdeadbeef
    2.  When Thread is running, it will overwrite 0xdeadbeef
    3.  up\\_check\\_tcbstack() detects 0xdeadbeef to get the stack
        peak value

    Usage:

    :   Enable CONFIG\\_STACK\\_COLORATION
</code></pre><ol start="2"><li></li></ol><pre><code>Compare sp and sl

:   When compiling the program, keep r10 and use r10 as stackbase::
    \\&#39;\\&#39;\\&#39; ARCHOPTIMIZATION += -finstrument-functions -ffixed-r10

    Each function will automatically add the following when entering
    and exiting: \\_\\_cyg\\_profile\\_func\\_enter
    \\_\\_cyg\\_profile\\_func\\_exit

    Usage:

    :   Enable CONFIG\\_ARMV8M\\_STACKCHECK or
        CONFIG\\_ARMV7M\\_STACKCHECK
</code></pre><h2 id="stack-overflow-hardware-check" tabindex="-1">Stack Overflow Hardware Check <a class="header-anchor" href="#stack-overflow-hardware-check" aria-label="Permalink to &quot;Stack Overflow Hardware Check&quot;">​</a></h2><ol><li>Set MSPLIM PSPLIM when context switching</li><li>Each time sp is operated, the hardware automatically compares sp and PSPLIM. If sp is lower than PSPLIM, crash</li></ol><p>Usage:</p><p>: Enable CONFIG_ARMV8M_STACKCHECK_HARDWARE</p><h2 id="stack-canary-check" tabindex="-1">Stack Canary Check <a class="header-anchor" href="#stack-canary-check" aria-label="Permalink to &quot;Stack Canary Check&quot;">​</a></h2><ol><li>Add a canary value to the stack</li><li>When the thread is running, the canary value is overwritten</li><li>When the thread is running, the canary value is compared with the original value</li><li>If the value is different, it means that the stack is overflowed</li></ol><p>Usage:</p><p>: Enable CONFIG_STACK_CANARIES</p>`,21)]))}const f=a(o,[["render",c]]);export{p as __pageData,f as default};
