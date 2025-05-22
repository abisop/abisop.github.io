import{_ as t,c as s,al as n,o}from"./chunks/framework.NFAqBSgQ.js";const f=JSON.parse('{"title":"ostest OS test","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/testing/ostest/index.md","filePath":"en/applications/testing/ostest/index.md"}'),i={name:"en/applications/testing/ostest/index.md"};function a(r,e,l,d,c,u){return o(),s("div",null,e[0]||(e[0]=[n(`<h1 id="ostest-os-test" tabindex="-1"><code>ostest</code> OS test <a class="header-anchor" href="#ostest-os-test" aria-label="Permalink to &quot;\`ostest\` OS test&quot;">​</a></h1><p>This is the NuttX _<a href="./.html">qualification</a> suite. It attempts to exercise a broad set of OS functionality. Its coverage is not very extensive as of this writing, but it is used to qualify each NuttX release.</p><p>The behavior of the <code>ostest</code> can be modified with the following settings in the <code>boards/&lt;arch&gt;/&lt;chip&gt;/&lt;board&gt;/configs/&lt;config&gt;/defconfig</code> file:</p><ul><li></li></ul><pre><code>\`CONFIG_NSH_BUILTIN_APPS\` -- Build the OS test example as an NSH built-in

:   application.
</code></pre><ul><li></li></ul><pre><code>\`CONFIG_TESTING_OSTEST_LOOPS\` -- Used to control the number of executions of

:   the test. If undefined, the test executes one time. If defined
    to be zero, the test runs forever.
</code></pre><ul><li></li></ul><pre><code>\`CONFIG_TESTING_OSTEST_STACKSIZE\` -- Used to create the ostest task. Default is

:   \`8192\`.
</code></pre><ul><li></li></ul><pre><code>\`CONFIG_TESTING_OSTEST_NBARRIER_THREADS\` -- Specifies the number of threads to

:   create in the barrier test. The default is 8 but a smaller
    number may be needed on systems without sufficient memory to
    start so many threads.
</code></pre><ul><li></li></ul><pre><code>\`CONFIG_TESTING_OSTEST_RR_RANGE\` -- During round-robin scheduling test two

:   threads are created. Each of the threads searches for prime
    numbers in the configurable range, doing that configurable
    number of times. This value specifies the end of search range
    and together with number of runs allows to configure the length
    of this test -- it should last at least a few tens of seconds.
    Allowed values \`[1; 32767]\`, default \`10000\`.
</code></pre><ul><li></li></ul><pre><code>\`CONFIG_TESTING_OSTEST_RR_RUNS\` -- During round-robin scheduling test two

:   threads are created. Each of the threads searches for prime
    numbers in the configurable range, doing that configurable
    number of times.
</code></pre>`,15)]))}const _=t(i,[["render",a]]);export{f as __pageData,_ as default};
