import{_ as o,c as t,al as n,o as a}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"gprof GNU Profile tool","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/system/gprof/index.md","filePath":"en/applications/system/gprof/index.md"}'),i={name:"en/applications/system/gprof/index.md"};function l(r,e,p,s,d,c){return a(),t("div",null,e[0]||(e[0]=[n(`<h1 id="gprof-gnu-profile-tool" tabindex="-1"><code>gprof</code> GNU Profile tool <a class="header-anchor" href="#gprof-gnu-profile-tool" aria-label="Permalink to &quot;\`gprof\` GNU Profile tool&quot;">​</a></h1><p>GNU Profile (gprof) is a performance analysis tool that helps developers identify code bottlenecks and optimize their programs. It provides detailed information about the execution time and call frequency of functions within a program.</p><p>gprof can be used to:</p><ol><li>Detect performance bottlenecks in your code</li><li>Identify which functions consume the most execution time</li><li>Analyze the call graph of your program</li><li>Help prioritize optimization efforts</li></ol><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><h3 id="build" tabindex="-1">Build <a class="header-anchor" href="#build" aria-label="Permalink to &quot;Build&quot;">​</a></h3><p>Enable the following configuration in NuttX:</p><pre><code>CONFIG_SYSTEM_GPROF
</code></pre><h3 id="using-in-nuttx" tabindex="-1">Using in NuttX <a class="header-anchor" href="#using-in-nuttx" aria-label="Permalink to &quot;Using in NuttX&quot;">​</a></h3><ol><li><p>Start profiling:</p><pre><code>nsh&gt; gprof start
</code></pre></li><li><p>Stop profiling:</p><pre><code>nsh&gt; gprof stop
</code></pre></li><li><p>Dump profiling data:</p><pre><code>nsh&gt; gprof dump /tmp/gmon.out
</code></pre></li></ol><h3 id="analyzing-on-host" tabindex="-1">Analyzing on Host <a class="header-anchor" href="#analyzing-on-host" aria-label="Permalink to &quot;Analyzing on Host&quot;">​</a></h3><ol><li><p>Pull the profiling data to host:</p><pre><code>adb pull /tmp/gmon.out ./gmon.out
</code></pre></li><li><p>Analyze the data using gprof tool:</p><pre><code>The saved file format complies with the standard gprof format.
For detailed instructions on gprof command usage, please refer to the GNU gprof manual:
https://ftp.gnu.org/old-gnu/Manuals/gprof-2.9.1/html_mono/gprof.html

arm-none-eabi-gprof ./nuttx/nuttx gmon.out -b

Example output:

\`\`\`
arm-none-eabi-gprof nuttx/nuttx gmon.out -b
Flat profile:

Each sample counts as 0.001 seconds.
  %   cumulative   self              self     total
 time   seconds   seconds    calls   s/call   s/call  name
 66.41      3.55     3.55       43     0.08     0.08  sdelay
 33.44      5.34     1.79       44     0.04     0.04  delay
  0.07      5.34     0.00                             up_idle
  0.04      5.34     0.00                             nx_start
  0.02      5.34     0.00                             fdtdump_main
  0.02      5.34     0.00                             nxsem_wait
  0.00      5.34     0.00        1     0.00     5.34  hello_main
  0.00      5.34     0.00        1     0.00     0.00  singal_handler

\`\`\`

This output shows the performance profile of the program,
including execution time and call counts for each function.
The flat profile table provides a quick overview of where the program spends most of its time.
In this example, \`sdelay\` and \`delay\` functions consume the majority of execution time.
This information can be used to identify performance bottlenecks and optimize critical parts of the code.
</code></pre></li></ol>`,12)]))}const m=o(i,[["render",l]]);export{u as __pageData,m as default};
