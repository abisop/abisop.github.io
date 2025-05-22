import{_ as t,c as s,al as o,o as i}from"./chunks/framework.NFAqBSgQ.js";const _=JSON.parse('{"title":"sd_stress SD card or mount point stress test","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/testing/sd_stress/index.md","filePath":"en/applications/testing/sd_stress/index.md"}'),r={name:"en/applications/testing/sd_stress/index.md"};function n(a,e,d,l,c,p){return i(),s("div",null,e[0]||(e[0]=[o(`<h1 id="sd-stress-sd-card-or-mount-point-stress-test" tabindex="-1"><code>sd_stress</code> SD card or mount point stress test <a class="header-anchor" href="#sd-stress-sd-card-or-mount-point-stress-test" aria-label="Permalink to &quot;\`sd_stress\` SD card or mount point stress test&quot;">​</a></h1><p>Performs stress testing on SD card or other mount points using the file system layer.</p><p>A single test run.</p><ul><li>Creates a staging directory</li><li>Creates multiple files in this directory. Writing, reading and verifying a set of bytes from each one.</li><li>Renames the staging directory.</li><li>Remove the created files from the renamed directory.</li><li>Remove the renamed directory.</li></ul><p>The following runtime options are available:</p><pre><code>nsh&gt; sdstress -h
Stress test on a mount point
sdstress: [-r] [-b] [-f]
  -r   Number of runs (1-10000), default 32
  -b   Number of bytes (1-10000), default 4096
  -f   Number of files (1-999), default 64
</code></pre><p>An example of a completed test:</p><pre><code>nsh&gt; sdstress -b 4096 -f 32 -r 5
Start stress test with 32 files, 4096 bytes and 5 iterations.
iteration 0 took 4063.445 ms: OK
iteration 1 took 4158.073 ms: OK
iteration 2 took 4216.130 ms: OK
iteration 3 took 4295.138 ms: OK
iteration 4 took 4352.903 ms: OK
Test OK: Average time: 4217.138 ms
</code></pre><p>The following Kconfig options can be used to configure the application at compile time.</p><ul><li><code>CONFIG_TESTING_SD_STRESS</code> - Enable the stress test utility.</li><li><code>CONFIG_TESTING_SD_STRESS_PROGNAME</code> - The name of the program registered with nsh.</li><li><code>CONFIG_TESTING_SD_STRESS_PRIORITY</code> - The priority of the task.</li><li><code>CONFIG_TESTING_SD_STRESS_STACKSIZE</code> - The stacksize of the task.</li><li><code>CONFIG_TESTING_SD_STRESS_STACKSIZE</code> - The mountpoint of the filesystem to test.</li></ul>`,10)]))}const S=t(r,[["render",n]]);export{_ as __pageData,S as default};
