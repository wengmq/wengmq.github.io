
## 磁盘写入测试

```bash
# 随机写入测试 (Random Read) —— 重点关注 IOPS
sudo fio --name=randwrite \
     --rw=randwrite \
     --bs=4k \
     --size=8G \
     --ioengine=io_uring \
     --iodepth=16 \
     --numjobs=1 \
     --direct=1 \
     --filename=/root/testfile \
     --group_reporting \
     --runtime=60 \
     --time_based

# 顺序写入测试 (Sequential Read) —— 重点关注 吞吐量/带宽
sudo fio --name=seqwrite \
     --rw=write \
     --bs=1M \
     --size=8G \
     --ioengine=io_uring \
     --iodepth=16 \
     --numjobs=1 \
     --direct=1 \
     --filename=/root/testfile \
     --group_reporting \
     --runtime=60 \
     --time_based
```


## 磁盘读取测试

```bash
# 随机读取测试 (Random Read) —— 重点关注 IOPS
sudo fio --name=randread \
     --rw=randread \
     --bs=4k \
     --size=8G \
     --ioengine=io_uring \
     --iodepth=16 \
     --numjobs=1 \
     --direct=1 \
     --filename=/root/testfile \
     --group_reporting


# 顺序读取测试 (Sequential Read) —— 重点关注 吞吐量/带宽
sudo fio --name=seqread \
     --rw=read \
     --bs=1M \
     --size=8G \
     --ioengine=io_uring \
     --iodepth=16 \
     --numjobs=1 \
     --direct=1 \
     --filename=/root/testfile \
     --group_reporting
```


## 压测结果&说明

- #### 写入测试
``` bash
root@wengmq-test:~$ sudo fio --name=randwrite \
     --rw=randwrite \
     --bs=4k \
     --size=8G \
     --ioengine=io_uring \
     --iodepth=16 \
     --numjobs=1 \
     --direct=1 \
     --filename=/root/testfile \
     --group_reporting \
     --runtime=60 \
     --time_based
randwrite: (g=0): rw=randwrite, bs=(R) 4096B-4096B, (W) 4096B-4096B, (T) 4096B-4096B, ioengine=io_uring, iodepth=16
fio-3.28
Starting 1 process
Jobs: 1 (f=1): [w(1)][100.0%][w=179MiB/s][w=45.8k IOPS][eta 00m:00s]
randwrite: (groupid=0, jobs=1): err= 0: pid=2569: Wed Feb  4 03:18:53 2026
  write: IOPS=46.4k, BW=181MiB/s (190MB/s)(10.6GiB/60001msec); 0 zone resets
    slat (usec): min=5, max=629, avg=15.79, stdev=12.20
    clat (usec): min=60, max=28313, avg=327.75, stdev=571.22
     lat (usec): min=73, max=28326, avg=343.73, stdev=570.84
    clat percentiles (usec):
     |  1.00th=[  149],  5.00th=[  184], 10.00th=[  204], 20.00th=[  231],
     | 30.00th=[  249], 40.00th=[  265], 50.00th=[  281], 60.00th=[  297],
     | 70.00th=[  318], 80.00th=[  338], 90.00th=[  383], 95.00th=[  441],
     | 99.00th=[ 1172], 99.50th=[ 2278], 99.90th=[ 9241], 99.95th=[13829],
     | 99.99th=[23200]
   bw (  KiB/s): min=157632, max=204023, per=100.00%, avg=186013.37, stdev=8692.72, samples=119
   iops        : min=39408, max=51005, avg=46503.34, stdev=2173.17, samples=119
  lat (usec)   : 100=0.02%, 250=30.24%, 500=66.46%, 750=1.65%, 1000=0.46%
  lat (msec)   : 2=0.60%, 4=0.33%, 10=0.16%, 20=0.07%, 50=0.02%
  cpu          : usr=5.88%, sys=60.62%, ctx=1264551, majf=0, minf=381
  IO depths    : 1=0.1%, 2=0.1%, 4=0.1%, 8=0.1%, 16=100.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.1%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=0,2786950,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=16

Run status group 0 (all jobs):
  WRITE: bw=181MiB/s (190MB/s), 181MiB/s-181MiB/s (190MB/s-190MB/s), io=10.6GiB (11.4GB), run=60001-60001msec

Disk stats (read/write):
  vda: ios=0/2781729, merge=0/25, ticks=0/527772, in_queue=527925, util=99.93%
  
  
root@wengmq-test:~$ sudo fio --name=seqwrite \
     --rw=write \
     --bs=1M \
     --size=8G \
     --ioengine=io_uring \
     --iodepth=16 \
     --numjobs=1 \
     --direct=1 \
     --filename=/root/testfile \
     --group_reporting \
     --runtime=60 \
     --time_based
seqwrite: (g=0): rw=write, bs=(R) 1024KiB-1024KiB, (W) 1024KiB-1024KiB, (T) 1024KiB-1024KiB, ioengine=io_uring, iodepth=16
fio-3.28
Starting 1 process
Jobs: 1 (f=1): [W(1)][100.0%][w=3130MiB/s][w=3130 IOPS][eta 00m:00s]
seqwrite: (groupid=0, jobs=1): err= 0: pid=2583: Wed Feb  4 03:21:00 2026
  write: IOPS=2942, BW=2942MiB/s (3085MB/s)(172GiB/60003msec); 0 zone resets
    slat (usec): min=23, max=2762, avg=84.97, stdev=29.41
    clat (usec): min=135, max=18404, avg=5352.55, stdev=2136.43
     lat (usec): min=175, max=18478, avg=5437.69, stdev=2134.45
    clat percentiles (usec):
     |  1.00th=[  429],  5.00th=[ 1336], 10.00th=[ 2802], 20.00th=[ 3851],
     | 30.00th=[ 4424], 40.00th=[ 4883], 50.00th=[ 5342], 60.00th=[ 5735],
     | 70.00th=[ 6259], 80.00th=[ 6915], 90.00th=[ 7898], 95.00th=[ 8848],
     | 99.00th=[11207], 99.50th=[12125], 99.90th=[14484], 99.95th=[15270],
     | 99.99th=[16909]
   bw (  MiB/s): min= 2311, max= 3364, per=100.00%, avg=2944.39, stdev=175.51, samples=119
   iops        : min= 2311, max= 3364, avg=2944.36, stdev=175.52, samples=119
  lat (usec)   : 250=0.22%, 500=1.02%, 750=1.03%, 1000=1.29%
  lat (msec)   : 2=3.35%, 4=15.43%, 10=75.34%, 20=2.31%
  cpu          : usr=15.90%, sys=9.53%, ctx=44120, majf=0, minf=2587
  IO depths    : 1=0.1%, 2=0.1%, 4=0.1%, 8=0.1%, 16=100.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.1%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=0,176530,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=16

Run status group 0 (all jobs):
  WRITE: bw=2942MiB/s (3085MB/s), 2942MiB/s-2942MiB/s (3085MB/s-3085MB/s), io=172GiB (185GB), run=60003-60003msec

Disk stats (read/write):
  vda: ios=73/210915, merge=0/60, ticks=143/1067118, in_queue=1067649, util=99.94%  
  

```

- #### 读取测试
```bash
root@wengmq-test:~$ sudo fio --name=randread \
     --rw=randread \
     --bs=4k \
     --size=8G \
     --ioengine=io_uring \
     --iodepth=16 \
     --numjobs=1 \
     --direct=1 \
     --filename=/root/testfile \
     --group_reporting
randread: (g=0): rw=randread, bs=(R) 4096B-4096B, (W) 4096B-4096B, (T) 4096B-4096B, ioengine=io_uring, iodepth=16
fio-3.28
Starting 1 process
Jobs: 1 (f=1): [r(1)][100.0%][r=156MiB/s][r=40.1k IOPS][eta 00m:00s]
randread: (groupid=0, jobs=1): err= 0: pid=2542: Wed Feb  4 03:15:00 2026
  read: IOPS=43.5k, BW=170MiB/s (178MB/s)(8192MiB/48163msec)
    slat (usec): min=4, max=378, avg= 9.88, stdev= 5.48
    clat (usec): min=87, max=20767, avg=356.87, stdev=138.13
     lat (usec): min=170, max=20774, avg=366.88, stdev=138.24
    clat percentiles (usec):
     |  1.00th=[  217],  5.00th=[  243], 10.00th=[  265], 20.00th=[  289],
     | 30.00th=[  310], 40.00th=[  326], 50.00th=[  347], 60.00th=[  363],
     | 70.00th=[  383], 80.00th=[  412], 90.00th=[  453], 95.00th=[  498],
     | 99.00th=[  611], 99.50th=[  676], 99.90th=[ 1074], 99.95th=[ 1680],
     | 99.99th=[ 7177]
   bw (  KiB/s): min=153056, max=184392, per=100.00%, avg=174477.72, stdev=6044.82, samples=96
   iops        : min=38264, max=46098, avg=43619.43, stdev=1511.21, samples=96
  lat (usec)   : 100=0.01%, 250=6.64%, 500=88.49%, 750=4.59%, 1000=0.16%
  lat (msec)   : 2=0.07%, 4=0.02%, 10=0.02%, 20=0.01%, 50=0.01%
  cpu          : usr=5.15%, sys=54.73%, ctx=722373, majf=0, minf=363
  IO depths    : 1=0.1%, 2=0.1%, 4=0.1%, 8=0.1%, 16=100.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.1%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=2097152,0,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=16

Run status group 0 (all jobs):
   READ: bw=170MiB/s (178MB/s), 170MiB/s-170MiB/s (178MB/s-178MB/s), io=8192MiB (8590MB), run=48163-48163msec

Disk stats (read/write):
  vda: ios=2096780/38, merge=0/8, ticks=727531/15, in_queue=727553, util=99.86%
  
  
  
root@wengmq-test:~$ sudo fio --name=seqread \
     --rw=read \
     --bs=1M \
     --size=8G \
     --ioengine=io_uring \
     --iodepth=16 \
     --numjobs=1 \
     --direct=1 \
     --filename=/root/testfile \
     --group_reporting
seqread: (g=0): rw=read, bs=(R) 1024KiB-1024KiB, (W) 1024KiB-1024KiB, (T) 1024KiB-1024KiB, ioengine=io_uring, iodepth=16
fio-3.28
Starting 1 process
Jobs: 1 (f=1): [R(1)][-.-%][r=2791MiB/s][r=2790 IOPS][eta 00m:00s]
seqread: (groupid=0, jobs=1): err= 0: pid=2551: Wed Feb  4 03:15:22 2026
  read: IOPS=2672, BW=2673MiB/s (2803MB/s)(8192MiB/3065msec)
    slat (usec): min=32, max=608, avg=43.41, stdev=19.63
    clat (usec): min=1905, max=27928, avg=5932.96, stdev=3003.86
     lat (usec): min=1943, max=27974, avg=5976.55, stdev=3004.71
    clat percentiles (usec):
     |  1.00th=[ 2180],  5.00th=[ 2507], 10.00th=[ 2802], 20.00th=[ 3523],
     | 30.00th=[ 4146], 40.00th=[ 4752], 50.00th=[ 5342], 60.00th=[ 5997],
     | 70.00th=[ 6718], 80.00th=[ 7767], 90.00th=[ 9634], 95.00th=[11731],
     | 99.00th=[16712], 99.50th=[19006], 99.90th=[23987], 99.95th=[26084],
     | 99.99th=[27919]
   bw (  MiB/s): min= 2154, max= 2802, per=100.00%, avg=2675.33, stdev=255.96, samples=6
   iops        : min= 2154, max= 2802, avg=2675.33, stdev=255.96, samples=6
  lat (msec)   : 2=0.07%, 4=27.76%, 10=63.32%, 20=8.46%, 50=0.39%
  cpu          : usr=0.23%, sys=14.33%, ctx=7339, majf=0, minf=4106
  IO depths    : 1=0.1%, 2=0.1%, 4=0.1%, 8=0.1%, 16=99.8%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.1%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=8192,0,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=16

Run status group 0 (all jobs):
   READ: bw=2673MiB/s (2803MB/s), 2673MiB/s-2673MiB/s (2803MB/s-2803MB/s), io=8192MiB (8590MB), run=3065-3065msec

Disk stats (read/write):
  vda: ios=8186/0, merge=0/0, ticks=48636/0, in_queue=48635, util=96.75%

```

- #### 结果说明

| **测试场景**     | **模式**      | **IOPS**  | **带宽 (Bandwidth)**        | **平均延迟 (Latency)** | **99% 延迟 (P99)** |
| ------------ | ----------- | --------- | ------------------------- | ------------------ | ---------------- |
| **随机读 (4k)** | `randread`  | **43.5k** | 170 MiB/s                 | 367 us (0.37ms)    | 611 us           |
| **随机写 (4k)** | `randwrite` | **46.4k** | 181 MiB/s                 | 344 us (0.34ms)    | 1.17 ms          |
| **顺序读 (1M)** | `seqread`   | 2.6k      | **2673 MiB/s** (~2.6GB/s) | 6.0 ms             | 16.7 ms          |
| **顺序写 (1M)** | `seqwrite`  | 2.9k      | **2942 MiB/s** (~2.9GB/s) | 5.4 ms             | 11.2 ms          |

 - #### 详细数据解读

 A. 随机读写性能 (Random Read/Write 4k)

这是衡量数据库（MySQL, Redis, PostgreSQL）性能最关键的指标。

- **IOPS (43.5k / 46.4k):**
    
    - 对于一块 50GB 的盘来说，**4万+ IOPS 是非常惊人的数值**。通常普通的云盘（如阿里云 ESSD PL1）是按容量线性分配 IOPS 的（例如 50GB 可能只有几千 IOPS）。能达到这个数值，说明该盘具备企业级 SSD 的性能，且未受限于小容量。
        
- **延迟 (Latency):**
    
    - 平均延迟在 **0.3ms (300us)** 左右，极低。
        
    - **P99 (99th percentile):** 随机读的 P99 仅为 0.6ms，说明性能非常稳定，几乎没有长尾延迟（抖动）。
        
- **CPU 瓶颈迹象:**
    
    - `cpu : usr=5.15%, sys=54.73%` (读)
        
    - `cpu : usr=5.88%, sys=60.62%` (写)
        
    - **分析：** `sys` 占用很高，说明单核 CPU 在处理这 4万次 I/O 中断和内核态切换时已经比较繁忙了。虽然你用了高效的 `io_uring` 引擎，但如果想跑出更高的 IOPS（假设磁盘还有余力），可能需要增加 `numjobs` 来利用多核 CPU。
        

 B. 顺序读写性能 (Sequential Read/Write 1M)

这是衡量日志写入、大数据分析、文件拷贝性能的指标。

- **带宽 (2.6GB/s / 2.9GB/s):**
    
    - 带宽接近 **3GB/s**。这通常是 PCIe 3.0/4.0 x4 接口 NVMe SSD 的典型物理极限。
        
    - 在云环境中，这通常意味着你使用的要么是**本地实例存储 (Local Instance Store)**，要么是**极高规格的云盘**，且网络带宽没有成为瓶颈。
        
- **稳定性:**
    
    - 带宽的标准差（stdev）很小，说明传输过程非常平稳，没有出现明显的掉速。