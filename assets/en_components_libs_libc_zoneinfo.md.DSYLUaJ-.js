import{_ as s,c as a,al as e,o as t}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"libs/libc/zoneinfo","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/libs/libc/zoneinfo.md","filePath":"en/components/libs/libc/zoneinfo.md"}'),i={name:"en/components/libs/libc/zoneinfo.md"};function p(o,n,l,r,c,d){return t(),a("div",null,n[0]||(n[0]=[e(`<h1 id="libs-libc-zoneinfo" tabindex="-1">libs/libc/zoneinfo <a class="header-anchor" href="#libs-libc-zoneinfo" aria-label="Permalink to &quot;libs/libc/zoneinfo&quot;">​</a></h1><p>Author: Gregory Nutt &lt;<a href="mailto:gnutt@nuttx.org" target="_blank" rel="noreferrer">gnutt@nuttx.org</a>&gt;</p><h2 id="directory-contents" tabindex="-1">Directory Contents <a class="header-anchor" href="#directory-contents" aria-label="Permalink to &quot;Directory Contents&quot;">​</a></h2><p>This directory contains logic to create a version of the TZ/Olson database. This database is required if localtime() support is selected via CONFIG_LIBC_LOCALTIME. This logic in this directory does the following:</p><ul><li>It downloads the current TZ database from the IANA website</li><li>It downloads the current timezone tools from the same location</li><li>It builds the tools and constructs the binary TZ database</li><li>It will then, optionally, build a ROMFS filesystem image containing the data base.</li></ul><h2 id="creating-and-mounting-a-romfs-tz-database" tabindex="-1">Creating and Mounting a ROMFS TZ Database <a class="header-anchor" href="#creating-and-mounting-a-romfs-tz-database" aria-label="Permalink to &quot;Creating and Mounting a ROMFS TZ Database&quot;">​</a></h2><p>The ROMFS filesystem image can that be mounted during the boot-up sequence so that it is available for the localtime() logic. There are two steps to doing this:</p><ul><li><p>First, a ROM disk device must be created. This is done by calling the function romdisk_register() as described in nuttx/include/nuttx/drivers/ramdisk.h. This is an OS level operation and must be done in the board-level logic before your application starts.</p><p>romdisk_register() will create a block driver at /dev/ramN where N is the device minor number that was provided to romdisk_register.</p></li><li><p>The second step is to mount the file system. This step can be performed either in your board configuration logic or by your application using the mount() interface described in nuttx/include/sys/mount.h.</p><p>These steps, however, must be done very early in initialization, before there is any need for time-related services.</p></li></ul><p>Both of these steps are shown together in the following code sample at the end of this page.</p><h2 id="example-configuration" tabindex="-1">Example Configuration <a class="header-anchor" href="#example-configuration" aria-label="Permalink to &quot;Example Configuration&quot;">​</a></h2><p>I have tested this using the sim/nsh configuration. Here are the modifications to the configuration that I used for testing:</p><pre><code>CONFIG_BOARD_LATE_INITIALIZE=y

CONFIG_LIBC_LOCALTIME=y
CONFIG_LIBC_TZDIR=&quot;/share/zoneinfo&quot;
CONFIG_LIBC_TZ_MAX_TIMES=370
CONFIG_LIBC_TZ_MAX_TYPES=20

CONFIG_LIBC_ZONEINFO=y
CONFIG_LIBC_ZONEINFO_ROMFS=y
</code></pre><p>NOTE: The full TZ database is quite large. To create a reasonable sized ROMFS image, I had to trim some of the files like this:</p><pre><code>cd nuttx
tools/configure.sh sim:nsh
make menuconfig
</code></pre><p>Select the above localtime() and nuttx/zoneinfo configuration settings. Then:</p><pre><code>make context
cd ../nuttx/libs/libc/zoneinfo/tzbin/usr/share/zoneinfo
</code></pre><p>Remove as many timezone files as you can. Do not remove the GMT, localtime, or posixrules files. Those might be needed in any event. Then you can force rebuilding of the ROMFS filesystem be removing some files:</p><pre><code>cd ../../..
rm romfs_zoneinfo.*
rm *.o
cd ../../nuttx
make
</code></pre><p>If you have problems building the simulator on your platform, check out [[/platform](]{.title-ref}/platform.md)s/sim/sim/boards/sim/index\`. You might find some help there.</p><p>Here is a sample run. I have not seen any errors in single stepping through the logic but neither am I certain that everything is working properly:</p><pre><code>NuttShell (NSH)
nsh&gt; date
Jul 01 00:00:02 2008
nsh&gt; set TZ US/Mountain
nsh&gt; date -s &quot;Apr 11 11:53:00 2015&quot;
nsh&gt; date
Apr 11 17:53:00 2015
</code></pre><p>NOTE: Because of daylight savings time, US/Mountain is GMT-6 on Apr 11. The above suggests that perhaps the NSH data command may be setting local time, but printing GMT time?</p><h2 id="sample-code-to-mount-the-romfs-filesystem" tabindex="-1">Sample Code to Mount the ROMFS Filesystem <a class="header-anchor" href="#sample-code-to-mount-the-romfs-filesystem" aria-label="Permalink to &quot;Sample Code to Mount the ROMFS Filesystem&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Included Files</span></span>
<span class="line"><span> ****************************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#include &lt;nuttx/config.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#include &lt;sys/mount.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;errno.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#include &lt;nuttx/drivers/ramdisk.h&gt;</span></span>
<span class="line"><span>#include &lt;nuttx/zoneinfo.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Pre-processor Definitions</span></span>
<span class="line"><span> ****************************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifndef CONFIG_LIBC_TZDIR</span></span>
<span class="line"><span>#  error CONFIG_LIBC_TZDIR is not defined</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifdef CONFIG_DISABLE_MOUNTPOINT</span></span>
<span class="line"><span>#  error &quot;Mountpoint support is disabled&quot;</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifndef CONFIG_FS_ROMFS</span></span>
<span class="line"><span>#  error &quot;ROMFS support not enabled&quot;</span></span>
<span class="line"><span>#endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define SECTORSIZE  64</span></span>
<span class="line"><span>#define NSECTORS(b) (((b)+SECTORSIZE-1)/SECTORSIZE)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/****************************************************************************</span></span>
<span class="line"><span> * Public Functions</span></span>
<span class="line"><span> ****************************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int mount_zoneinfo(int minor)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   char devname[32];</span></span>
<span class="line"><span>   int  ret;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* Create a RAM disk for the test */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ret = romdisk_register(minor, romfs_zoneinfo_img,</span></span>
<span class="line"><span>                         NSECTORS(romfs_zoneinfo_img_len), SECTORSIZE);</span></span>
<span class="line"><span>  if (ret &lt; 0)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      printf(&quot;ERROR: Failed to create RAM disk\\n&quot;);</span></span>
<span class="line"><span>      return ret;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* Use the minor number to create a name for the ROM disk block device */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  snprintf(devname, sizeof(devname), &quot;/dev/ram%d&quot;, minor);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* Mount the ROMFS file system */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  printf(&quot;Mounting ROMFS filesystem at target=%s with source=%s\\n&quot;,</span></span>
<span class="line"><span>         CONFIG_LIBC_TZDIR, devname);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ret = mount(devname, CONFIG_LIBC_TZDIR, &quot;romfs&quot;, MS_RDONLY, NULL);</span></span>
<span class="line"><span>  if (ret &lt; 0)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      printf(&quot;ERROR: Mount failed: %d\\n&quot;, errno);</span></span>
<span class="line"><span>      return ret;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  printf(&quot;TZ database mounted at %s\\n&quot;, CONFIG_LIBC_TZDIR);</span></span>
<span class="line"><span>  return OK;</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,24)]))}const m=s(i,[["render",p]]);export{h as __pageData,m as default};
