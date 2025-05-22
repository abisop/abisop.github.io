import{_ as t,c as r,al as o,o as n}from"./chunks/framework.NFAqBSgQ.js";const m=JSON.parse('{"title":"CROMFS","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/filesystem/cromfs.md","filePath":"en/components/filesystem/cromfs.md"}'),a={name:"en/components/filesystem/cromfs.md"};function s(i,e,d,l,c,h){return n(),r("div",null,e[0]||(e[0]=[o(`<h1 id="cromfs" tabindex="-1">CROMFS <a class="header-anchor" href="#cromfs" aria-label="Permalink to &quot;CROMFS&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>This directory contains the the CROMFS file system. This is an in-memory (meaning no block driver), read-only (meaning that can lie in FLASH) file system. It uses LZF decompression on data only (meta data is not compressed).</p><p>It accesses the in-memory file system via directory memory reads and, hence, can only reside in random access NOR-like FLASH. It is intended for use with on-chip FLASH available on most MCUs (the design could probably be extended to access non-random-access FLASH as well, but those extensions are not yet in place).</p><p>I do not have a good way to measure how much compression we get using LZF. I have seen 37% compression reported in other applications, so I have to accept that for now. That means, for example, that you could have a file system with 512Kb of data in only 322Kb of FLASH, giving you 190Kb to do other things with.</p><p>LZF compression is not known for its high compression ratios, but rather for fast decompression. According to the author of the LZF decompression routine, it is nearly as fast as a memcpy!</p><p>There is also a new tool at /tools/gencromfs.c that will generate binary images for the NuttX CROMFS file system and and an example CROMFS file system image at apps/examples/cromfs. That example includes a test file system that looks like:</p><pre><code> ls -Rl ../apps/examples/cromfs/cromfs
../apps/examples/cromfs/cromfs:
total 2
-rwxr--r--+ 1 spuda spuda 171 Mar 20 08:02 BaaBaaBlackSheep.txt
drwxrwxr-x+ 1 spuda spuda   0 Mar 20 08:11 emptydir
-rwxr--r--+ 1 spuda spuda 118 Mar 20 08:05 JackSprat.txt
drwxrwxr-x+ 1 spuda spuda   0 Mar 20 08:06 testdir1
drwxrwxr-x+ 1 spuda spuda   0 Mar 20 08:10 testdir2
drwxrwxr-x+ 1 spuda spuda   0 Mar 20 08:05 testdir3
../apps/examples/cromfs/cromfs/emptydir:
total 0
../apps/examples/cromfs/cromfs/testdir1:
total 2
-rwxr--r--+ 1 spuda spuda 249 Mar 20 08:03 DingDongDell.txt
-rwxr--r--+ 1 spuda spuda 247 Mar 20 08:06 SeeSawMargorieDaw.txt
../apps/examples/cromfs/cromfs/testdir2:
total 5
-rwxr--r--+ 1 spuda spuda  118 Mar 20 08:04 HickoryDickoryDock.txt
-rwxr--r--+ 1 spuda spuda 2082 Mar 20 08:10 TheThreeLittlePigs.txt
../apps/examples/cromfs/cromfs/testdir3:
total 1
-rwxr--r--+ 1 spuda spuda 138 Mar 20 08:05 JackBeNimble.txt
</code></pre><p>When built into NuttX and deployed on a target, it looks like:</p><pre><code>NuttShell (NSH) NuttX-7.24
nsh&gt; mount -t cromfs /mnt/cromfs
nsh&gt; ls -Rl /mnt/cromfs
/mnt/cromfs:
 dr-xr-xr-x       0 .
 -rwxr--r--     171 BaaBaaBlackSheep.txt
 dr-xr-xr-x       0 emptydir/
 -rwxr--r--     118 JackSprat.txt
 dr-xr-xr-x       0 testdir1/
 dr-xr-xr-x       0 testdir2/
 dr-xr-xr-x       0 testdir3/
/mnt/cromfs/emptydir:
 drwxrwxr-x       0 .
 dr-xr-xr-x       0 ..
/mnt/cromfs/testdir1:
 drwxrwxr-x       0 .
 dr-xr-xr-x       0 ..
 -rwxr--r--     249 DingDongDell.txt
 -rwxr--r--     247 SeeSawMargorieDaw.txt
/mnt/cromfs/testdir2:
 drwxrwxr-x       0 .
 dr-xr-xr-x       0 ..
 -rwxr--r--     118 HickoryDickoryDock.txt
 -rwxr--r--    2082 TheThreeLittlePigs.txt
/mnt/cromfs/testdir3:
 drwxrwxr-x       0 .
 dr-xr-xr-x       0 ..
 -rwxr--r--     138 JackBeNimble.txt
nsh&gt;
</code></pre><p>Everything I have tried works: examining directories, catting files, etc. The &quot;.&quot; and &quot;..&quot; hard links also work:</p><pre><code>nsh&gt; cd /mnt/cromfs
nsh&gt; cat emptydir/../testdir1/DingDongDell.txt
Ding, dong, bell,
Pussy&#39;s in the well.
Who put her in?
Little Johnny Green.

Who pulled her out?
Little Tommy Stout.
What a naughty boy was that,
To try to drown poor pussy cat,
Who never did him any harm,
And killed the mice in his father&#39;s barn.

nsh&gt;
</code></pre><h2 id="gencromfs" tabindex="-1">gencromfs <a class="header-anchor" href="#gencromfs" aria-label="Permalink to &quot;gencromfs&quot;">​</a></h2><p>The genromfs program can be found in tools/. It is a single C file called gencromfs.c. It can be built in this way:</p><pre><code>cd tools
make -f Makefile.host gencromfs
</code></pre><p>The genromfs tool used to generate CROMFS file system images. Usage is simple:</p><pre><code>gencromfs &lt;dir-path&gt; &lt;out-file&gt;
</code></pre><p>Where:</p><pre><code>&lt;dir-path&gt; is the path to the directory will be at the root of the
  new CROMFS file system image.
&lt;out-file&gt; the name of the generated, output C file.  This file must
  be compiled in order to generate the binary CROMFS file system
  image.
</code></pre><p>All of these steps are automated in the apps/examples/cromfs/Makefile. Refer to that Makefile as an reference.</p><h2 id="architecture" tabindex="-1">Architecture <a class="header-anchor" href="#architecture" aria-label="Permalink to &quot;Architecture&quot;">​</a></h2><p>The CROMFS file system is represented by an in-memory data structure. This structure is a &quot;tree.&quot; At the root of the tree is a &quot;volume node&quot; that describes the overall operating system. Other entities within the file system are presented by other types of nodes: hard links, directories, and files. These nodes are all described in fs/cromfs/cromfs.h.</p><p>In addition to general volume information, the volume node provides an offset to the the &quot;root directory&quot;. The root directory, like all other CROMFS directories is simply a singly linked list of other nodes: hard link nodes, directory nodes, and files. This list is managed by &quot;peer offsets&quot;: Each node in the directory contains an offset to its peer in the same directory. This directory list is terminated with a zero offset.</p><p>The volume header lies at offset zero. Hence, any offset to a node or data block can be converted to an absolute address in the in-memory CROMFS image by simply adding that offset to the well-known address of the volume header.</p><p>Each hard link, directory, and file node in the directory list includes such a &quot;peer offset&quot; to the next node in the list. Each node is followed by the NUL-terminated name of the node. Each node also holds an additional offset. Directory nodes contain a &quot;child offset&quot;. That is, the offset to the first entry in another singly linked list of nodes comprising the sub-directory.</p><p>Hard link nodes hold the &quot;link offset&quot; to the node which is the target of the link. The link offset may be an offset to another hard link node, to a directory, or to a file node. The directory link offset would refer the first node in singly linked directory list that represents the directory.</p><p>File nodes provide file data. The file name string is followed by a variable length list of compressed data blocks. In this case each compressed data block begins with an LZF header as described in include/lzf.h.</p><p>So, given this description, we could illustrate the sample CROMFS file system above with these nodes (where V=volume node, H=Hard link node, D=directory node, F=file node, D=Data block):</p><pre><code>V
\`- +- H: .
   |
   +- F: BaaBaaBlackSheep.txt
   |  \`- D,D,D,...D
   +- D: emptydir
   |  |- H: .
   |  \`- H: ..
   +- F: JackSprat.txt
   |  \`- D,D,D,...D
   +- D: testdir1
   |  |- H: .
   |  |- H: ..
   |  |- F: DingDongDell.txt
   |  |  \`- D,D,D,...D
   |  \`- F: SeeSawMargorieDaw.txt
   |     \`- D,D,D,...D
   +- D: testdir2
   |  |- H: .
   |  |- H: ..
   |  |- F: HickoryDickoryDock.txt
   |  |  \`- D,D,D,...D
   |  \`- F: TheThreeLittlePigs.txt
   |     \`- D,D,D,...D
   +- D: testdir3
      |- H: .
      |- H: ..
      \`- F: JackBeNimble.txt
         \`- D,D,D,...D
</code></pre><p>Where, for example:</p><pre><code>H: ..

  Represents a hard-link node with name &quot;..&quot;

|
+- D: testdir1
|  |- H: .

  Represents a directory node named &quot;testdir1&quot;.  The first node of the
  directory list is a hard link with name &quot;.&quot;

|
+- F: JackSprat.txt
|  \`- D,D,D,...D

  Represents f file node named &quot;JackSprat.txt&quot; and is followed by some
  sequence of compressed data blocks, D.
</code></pre><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h2><p>To build the CROMFS file system, you would add the following to your configuration:</p><ol><li><p>Enable LZF (The other LZF settings apply only to compression and, hence, have no impact on CROMFS which only decompresses):</p><pre><code>CONFIG_LIBC_LZF=y
</code></pre><p>NOTE: This should be selected automatically when CONFIG_FS_CROMFS is enabled.</p></li><li><p>Enable the CROMFS file system:</p><pre><code>CONFIG_FS_CROMFS=y
</code></pre></li><li><p>Enable the apps/examples/cromfs example:</p><pre><code>CONFIG_EXAMPLES_CROMFS=y
</code></pre><p>Or the apps/examples/elf example if you like:</p><pre><code>CONFIG_ELF=y
# CONFIG_BINFMT_DISABLE is not set
CONFIG_EXAMPLES_ELF=y
CONFIG_EXAMPLES_ELF_CROMFS=y
</code></pre><p>Or implement your own custom CROMFS file system that example as a guideline.</p></li></ol>`,34)]))}const f=t(a,[["render",s]]);export{m as __pageData,f as default};
