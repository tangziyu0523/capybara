# 寻意城市 3D 可视化 / XuanYi City 3D Visualization

基于 Three.js 的未来城市 3D 可视化系统，为"100万立方米挑战项目"提供高质量的实时渲染展示。

## 特性

- **高质量渲染**: PBR材质、HDR光照、后处理效果 (Bloom, SMAA)
- **动态海洋**: 自定义Gerstner波浪着色器，菲涅尔反射
- **昼夜循环**: 实时光照变化，天空颜色过渡
- **四大区域**: 珊瑚礁街、阳光峡谷、林语栖所、潮汐客厅
- **性能优化**: 实例化渲染、LOD系统、自适应质量

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 控制

- **左键拖拽**: 旋转视角
- **右键拖拽**: 平移视角
- **滚轮**: 缩放
- **触摸**: 支持移动端手势

## 控制面板

- **后处理效果**: 开关 SSAO、Bloom、SMAA
- **时间控制**: 调整昼夜时间，预设时间点
- **海洋设置**: 波浪高度、频率
- **调试选项**: 线框模式、性能统计

## 技术栈

- [Three.js](https://threejs.org/) r169+ - 3D渲染引擎
- [Vite](https://vitejs.dev/) 5.x - 构建工具
- [postprocessing](https://github.com/pmndrs/postprocessing) - 后处理效果
- [lil-gui](https://github.com/georgealways/lil-gui) - 控制面板
- [stats.js](https://github.com/mrdoob/stats.js/) - 性能监控

## 项目结构

```
xuanyi-city-3d/
├── src/
│   ├── core/           # 核心模块 (Application, EventBus, Camera)
│   ├── render/         # 渲染模块 (PostProcess, Shaders)
│   ├── scene/          # 场景模块 (Districts, Ocean, Lighting)
│   ├── ui/             # UI模块 (Controls, Debug, Loading)
│   ├── utils/          # 工具模块 (AssetLoader, Compatibility)
│   ├── data/           # 数据文件 (buildings.json, config.json)
│   └── main.js         # 入口文件
├── public/             # 静态资源
└── index.html
```

## 性能目标

| 设备 | 目标帧率 | 分辨率 |
|------|----------|--------|
| 桌面 (独显) | 60fps | 1080p |
| 桌面 (核显) | 30fps | 1080p |
| 移动端 | 30fps | 720p |

## 区域说明

| 区域 | 位置 | 体积 | 主要功能 |
|------|------|------|----------|
| 珊瑚礁街 | 中央 | ~350,000m³ | 商业、文化、中枢 |
| 阳光峡谷 | 西南 | ~300,000m³ | 工业、农业、能源 |
| 林语栖所 | 北部 | ~267,050m³ | 居住、教育、疗愈 |
| 潮汐客厅 | 东南 | ~246,670m³ | 海洋居住、科研 |

## 许可证

MIT License

---

*寻意城市 - 100万立方米挑战项目可视化*
