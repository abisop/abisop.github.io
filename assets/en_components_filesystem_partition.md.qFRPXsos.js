import{_ as t,c as i,al as a,o}from"./chunks/framework.NFAqBSgQ.js";const c=JSON.parse('{"title":"Partition Table","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/filesystem/partition.md","filePath":"en/components/filesystem/partition.md"}'),n={name:"en/components/filesystem/partition.md"};function r(s,e,l,p,f,x){return o(),i("div",null,e[0]||(e[0]=[a(`<h1 id="partition-table" tabindex="-1">Partition Table <a class="header-anchor" href="#partition-table" aria-label="Permalink to &quot;Partition Table&quot;">​</a></h1><h2 id="text-based-partition-table" tabindex="-1">Text based Partition Table <a class="header-anchor" href="#text-based-partition-table" aria-label="Permalink to &quot;Text based Partition Table&quot;">​</a></h2><p><strong>Summary</strong></p><p>TXTABLE - A text based partition table stored in last eraseblock (or in romdisk for backup).</p><ol><li>The 1st line must be &quot;Magic+Version&quot;, current is &quot;TXTABLE0&quot;.</li><li>The 2nd and remaining lines are partition entries(min: one) in format: &quot;%s %zx %zx&quot;(means name, size and offset (byte)(in hex)).</li><li>Size or offset can be default zero(means zero(for 1st entry) or calculated(for others)), and will be calculated by the parser refs to previous and next entries.</li><li>The last eraseblock will be registered as pseudo partition named &quot;txtable&quot;. If the last eraseblock included by the last real partition, it will be excluded from.</li></ol><p>To avoid problems of PTABLE: In case of multiple NuttX binary, partition table maybe out of sync.</p><p>And it&#39;s easier:</p><ol><li>Text format with simple rules(name + size + offset).</li><li>Size or offset can be default(calculated refs to previous and next entries).</li><li>Support backup table(eg. /etc/txtable.txt in ROMFS)</li></ol><p>Size / Offset can be automatically calculated, case:</p><ol><li>The offset of the first entry is zero, and the offset of other entries is zero: automatic calculation;</li><li>The size of the last entry is zero: fill to the end of the entire Flash (keep the last eraseblock); the size of other entries is zero: automatically calculated(next.offset - current.offset);</li><li>Typical case 1: The size of all entries is zero (calculated automatically), and the offset is non-zero;</li><li>Typical case 2: The size and offset of a certain entry are all zero, but the size and offset of two adjacent entries are all non-zero;</li></ol><p><strong>Examples</strong></p><p>Both size and offset of &quot;partition6&quot; are zero, gap exists between &quot;partition7&quot; and &quot;data&quot;, and not reserve last eraseblock.</p><ul><li><p>txtable.txt</p><pre><code>TXTABLE0
partition1 0x6C000 0x4000
partition2 0x10000 0x70000
partition3 0x80000 0x80000
partition4 0x80000 0x100000
partition5 0x280000 0x180000
partition6 0 0
partition7 0x10000 0x480000
data 0 0x500000
</code></pre></li><li><p>Parsed</p><p>| Reserved last eraseblock, and gap between partition7 and data is kept. | Format: name, offset, size</p><pre><code>/dev/partition1   offset 0x00004000, size 0x0006c000
/dev/partition2   offset 0x00070000, size 0x00010000
/dev/partition3   offset 0x00080000, size 0x00080000
/dev/partition4   offset 0x00100000, size 0x00080000
/dev/partition5   offset 0x00180000, size 0x00280000
/dev/partition6   offset 0x00400000, size 0x00080000
/dev/partition7   offset 0x00480000, size 0x00010000
/dev/data         offset 0x00500000, size 0x00aff000
/dev/txtable      offset 0x00fff000, size 0x00001000
</code></pre></li></ul><p>More than one not set size or offset</p><ul><li><p>txtable.txt</p><pre><code>TXTABLE0
partition1 0 0x4000
partition2 0 0x70000
partition3 0 0x80000
partition4 0x80000 0x100000
partition5 0x280000 0
partition6 0 0
partition7 0x10000 0x480000
data 0 0x500000
</code></pre></li><li><p>Parsed</p><p>| Size of partition[2,3,4,6] and data are calculated, and gap between partition7 and data is kept.</p><pre><code>/dev/partition1   offset 0x00004000, size 0x0006c000
/dev/partition2   offset 0x00070000, size 0x00010000
/dev/partition3   offset 0x00080000, size 0x00080000
/dev/partition4   offset 0x00100000, size 0x00080000
/dev/partition5   offset 0x00180000, size 0x00280000
/dev/partition6   offset 0x00400000, size 0x00080000
/dev/partition7   offset 0x00480000, size 0x00010000
/dev/data         offset 0x00500000, size 0x00aff000
/dev/txtable      offset 0x00fff000, size 0x00001000
</code></pre></li></ul><p>Only one partition entry, and size not spec</p><ul><li><p>txtable.txt</p><pre><code>TXTABLE0
partition1 0x0 0x4000
</code></pre></li><li><p>Parsed</p><p>| The last eraseblock was kept, and size is correct.</p><pre><code>/dev/partition1   offset 0x00004000, size 0x00ffb000
/dev/txtable      offset 0x00fff000, size 0x00001000
</code></pre></li></ul><p>Blank line &amp;&amp; New line delim</p><ul><li><p>txtable.txt</p><p>| New line: CR + LF / LF. | Additional char/string after &quot;%s %zx %zx&quot;.</p><pre><code>TXTABLE0
partition1 0x6C000 0x4000
partition2 0 0x70000
partition3 0 0x80000
partition4 0 0x100000
partition5 0x280000 0x180000
partition6 0x80000 0x400000   # String between &quot;%s %zx %zx&quot; and &quot;LF&quot; will be ignored.
partition7 0x10000 0x480000   # Comments: This is the 7th partition.
data 0 0x500000



EOF
</code></pre></li><li><p>Parsed</p><p>| Blank lines are ignored, and new line of both &quot;LF&quot; or &quot;CRLF&quot; are parsed. String between &quot;%s %zx %zx&quot; and &quot;LF&quot; will be ignored(eg. CR, or some comments).</p><pre><code>/dev/partition1   offset 0x00004000, size 0x0006c000
/dev/partition2   offset 0x00070000, size 0x00010000
/dev/partition3   offset 0x00080000, size 0x00080000
/dev/partition4   offset 0x00100000, size 0x00080000
/dev/partition5   offset 0x00180000, size 0x00280000
/dev/partition6   offset 0x00400000, size 0x00080000
/dev/partition7   offset 0x00480000, size 0x00010000
/dev/data         offset 0x00500000, size 0x00aff000
/dev/txtable      offset 0x00fff000, size 0x00001000
</code></pre></li></ul>`,19)]))}const u=t(n,[["render",r]]);export{c as __pageData,u as default};
