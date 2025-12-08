# 寻意城市 3D 可视化 MVP PRD

## 文档信息

| 项目 | 内容 |
|------|------|
| 文档名称 | 寻意城市 3D 可视化系统 PRD |
| 文档版本 | V1.0 |
| 文档作者 | Pong / Claude |
| 创建日期 | 2025-12-05 |
| 最后更新 | 2025-12-05 |
| 文档状态 | 草稿 |
| 项目优先级 | P0 |
| 项目代号 | XuanYi-3D |

### 更新记录

| 版本 | 日期 | 作者 | 更新内容 |
|------|------|------|----------|
| V1.0 | 2025-12-05 | Pong | 初稿，技术演示型MVP方案 |

---

## 1. 需求概述

### 1.1 需求背景

#### 业务背景

"100万立方米挑战项目"是一个面向未来城市设计的概念验证项目，旨在构建一个基于刘公岛地貌的未来生态城市模型。该项目已完成详细的环境设计规划，包含四大功能区域（珊瑚礁街、林语栖所、潮汐客厅、阳光峡谷）和贯穿全城的静谧花园疗愈网络。

目前项目缺乏一个直观的可视化展示手段，无法让利益相关者（评委、投资人、合作方）快速理解城市的空间结构、设计理念和技术亮点。

#### 用户场景

**场景1：项目展示**
- 在挑战赛/路演中，向评委展示城市的整体规划
- 需要在3-5分钟内传达核心设计理念
- 希望通过高质量的视觉效果留下深刻印象

**场景2：设计验证**
- 设计团队需要验证空间比例是否合理
- 需要检查各区域的连接逻辑是否流畅
- 希望能够自由探索并发现潜在问题

**场景3：技术展示**
- 作为技术Demo展示Three.js的渲染能力
- 为后续迭代建立可扩展的代码架构
- 作为团队技术能力的背书

#### 需求来源

- 项目要求：100万立方米挑战项目的可视化呈现需求
- 技术储备：为未来WebGL/WebGPU城市可视化项目积累经验
- 展示需要：路演、答辩、演示等场景的高质量展示素材

### 1.2 产品目标

#### 用户目标

| 目标 | 描述 | 衡量标准 |
|------|------|----------|
| 视觉震撼 | 首次进入场景时产生"Wow"感受 | 用户反馈、停留时长 |
| 空间理解 | 理解四区布局和连接关系 | 用户能复述城市结构 |
| 技术认可 | 认可项目的技术实力 | 技术评分、代码质量 |

#### 商业目标

- 在挑战赛中获得高分/获奖
- 为后续城市可视化项目积累技术资产
- 建立团队在3D可视化领域的技术口碑

#### 目标用户

**主要用户：项目评审方**
- 特征：具有建筑/城规/技术背景，关注创新性和可行性
- 需求：快速理解项目，评估技术实力
- 使用场景：路演现场、线上评审

**次要用户：设计团队**
- 特征：参与项目设计的内部成员
- 需求：验证设计、发现问题、迭代优化
- 使用场景：设计评审、内部讨论

**潜在用户：技术社区**
- 特征：Three.js/WebGL开发者
- 需求：学习参考、技术交流
- 使用场景：代码开源后

### 1.3 产品范围

#### 本期范围（MVP）

**P0 核心功能（必须实现）**
- [ ] 高质量渲染管线（PBR + HDR + 后处理）
- [ ] 海洋着色器（波浪 + 反射 + 折射）
- [ ] 四大区域体量渲染（实例化渲染）
- [ ] 自由相机控制（OrbitControls）
- [ ] 基础昼夜光照系统

**P1 重要功能（强烈建议）**
- [ ] LOD（细节层次）系统
- [ ] 性能监控面板（FPS/DrawCalls）
- [ ] 后处理效果开关面板（Bloom/SSAO）
- [ ] 城市意识塔发光效果
- [ ] 区域色彩编码系统

**P2 增强功能（有则更好）**
- [ ] 移动端适配与自动降级
- [ ] WebGPU渲染器备选
- [ ] 磁悬浮轨道动画
- [ ] 调试模式（线框/包围盒显示）

#### 不在范围内

- ❌ 单体建筑的详细内部结构
- ❌ 114种具体设施的独立建模
- ❌ 人流/车流模拟系统
- ❌ VR/AR适配
- ❌ 实时多人协作
- ❌ 后端数据服务

#### 依赖条件

| 依赖项 | 描述 | 提供方 |
|--------|------|--------|
| 建筑数据 | 各区域建筑体积、类型、位置 | 环境设计文档 |
| 地形数据 | 刘公岛高度图 | 需制作或获取 |
| 纹理资源 | 水面法线、环境贴图 | 公开资源或自制 |
| 开发工具 | Trae AI IDE | 字节跳动 |

---

## 2. 市场与技术分析

### 2.1 技术趋势

**WebGL/WebGPU 发展现状**
- WebGL 2.0已在主流浏览器普及，支持率>95%
- WebGPU正在逐步推出，Chrome/Edge已支持
- Three.js r169+ 版本支持WebGPU渲染器

**城市可视化领域趋势**
- 数字孪生城市项目快速增长
- 实时渲染质量逐渐接近离线渲染
- 程序化生成技术广泛应用

### 2.2 竞品/参考分析

| 项目名称 | 类型 | 优势 | 劣势 | 借鉴点 |
|---------|------|------|------|--------|
| [Polygon Runway](https://polygonrunway.com/) | Three.js展示 | 视觉效果惊艳 | 偏艺术展示 | 后处理效果组合 |
| [城市引擎CityEngine](https://www.esri.com/en-us/arcgis/products/arcgis-cityengine) | 专业软件 | 功能完整 | 非Web端 | 程序化建筑生成 |
| [Mapbox GL](https://www.mapbox.com/) | 地图引擎 | 地形处理成熟 | 建筑渲染弱 | 地形LOD策略 |
| [three.js Journey](https://threejs-journey.com/) | 教程 | 代码规范 | 非城市场景 | 着色器技术 |

**差异化策略**
- 聚焦"未来城市"概念，而非现实城市复刻
- 强调中国文化元素（林语栖所的中式园林）
- 技术与叙事结合，不仅是技术Demo

### 2.3 技术可行性评估

| 技术点 | 难度 | 风险 | 应对策略 |
|--------|------|------|----------|
| PBR渲染 | ⭐⭐ | 低 | Three.js原生支持 |
| 海洋着色器 | ⭐⭐⭐⭐ | 中 | 参考成熟Shader案例 |
| 后处理管线 | ⭐⭐⭐ | 低 | 使用postprocessing库 |
| LOD系统 | ⭐⭐⭐ | 中 | 基于距离的简单LOD |
| 实例化渲染 | ⭐⭐ | 低 | InstancedMesh原生支持 |
| 移动端适配 | ⭐⭐⭐⭐ | 高 | 备选方案：降级渲染 |

---

## 3. 功能需求详细说明

### 3.1 功能架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                     寻意城市 3D 可视化系统                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   渲染引擎   │  │   场景管理   │  │   交互控制   │             │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤             │
│  │ • WebGL渲染器│  │ • 地形系统   │  │ • 相机控制  │             │
│  │ • 后处理管线 │  │ • 建筑系统   │  │ • 效果开关  │             │
│  │ • 着色器系统 │  │ • 光照系统   │  │ • 性能面板  │             │
│  │ • LOD管理   │  │ • 粒子系统   │  │ • 调试工具  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                            ↓                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      数据层                               │   │
│  │  buildings.json │ terrain.json │ config.json             │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 核心功能说明

---

#### 功能1：高质量渲染管线

**功能描述**

构建基于Three.js的高质量渲染管线，整合PBR材质、HDR环境光照、多重后处理效果，实现接近电影级的实时渲染质量。

**用户价值**

- 产生强烈的视觉冲击力，在演示中留下深刻印象
- 展示团队的技术实力和对细节的追求
- 为后续项目建立可复用的渲染框架

**技术方案**

```javascript
// 渲染管线核心结构
class RenderPipeline {
  constructor(renderer, scene, camera) {
    this.composer = new EffectComposer(renderer);
    
    // Pass 1: 基础渲染
    this.renderPass = new RenderPass(scene, camera);
    this.composer.addPass(this.renderPass);
    
    // Pass 2: SSAO（环境光遮蔽）
    this.ssaoPass = new SSAOPass(scene, camera, width, height);
    this.ssaoPass.kernelRadius = 16;
    this.ssaoPass.minDistance = 0.005;
    this.ssaoPass.maxDistance = 0.1;
    this.composer.addPass(this.ssaoPass);
    
    // Pass 3: Bloom（泛光）
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.5,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    this.composer.addPass(this.bloomPass);
    
    // Pass 4: 色调映射
    this.toneMappingPass = new ShaderPass(ACESFilmicToneMappingShader);
    this.composer.addPass(this.toneMappingPass);
    
    // Pass 5: 抗锯齿
    this.fxaaPass = new ShaderPass(FXAAShader);
    this.composer.addPass(this.fxaaPass);
  }
  
  render() {
    this.composer.render();
  }
  
  // 效果开关
  setSSAOEnabled(enabled) {
    this.ssaoPass.enabled = enabled;
  }
  
  setBloomEnabled(enabled) {
    this.bloomPass.enabled = enabled;
  }
}
```

**渲染效果配置**

| 效果 | 参数 | 默认值 | 说明 |
|------|------|--------|------|
| SSAO | kernelRadius | 16 | 采样半径 |
| SSAO | intensity | 1.0 | 强度 |
| Bloom | strength | 0.5 | 泛光强度 |
| Bloom | threshold | 0.85 | 亮度阈值 |
| ToneMapping | exposure | 1.0 | 曝光度 |
| FXAA | enabled | true | 抗锯齿 |

**验收标准**

- [ ] 场景在4K分辨率下渲染无明显锯齿
- [ ] SSAO效果在建筑交界处产生自然阴影
- [ ] Bloom效果使发光物体产生光晕
- [ ] 各效果可独立开关，无报错
- [ ] 桌面端60fps，移动端30fps

---

#### 功能2：海洋着色器系统

**功能描述**

为潮汐客厅区域创建高质量的海洋表面渲染，包含动态波浪、菲涅尔反射、水下焦散等效果，营造真实的海洋氛围。

**用户价值**

- 海洋是潮汐客厅的核心视觉元素，直接影响整体观感
- 动态水面增加场景生命力
- 展示自定义着色器的技术能力

**技术方案**

```glsl
// ocean.vert - 顶点着色器
uniform float uTime;
uniform float uWaveHeight;
uniform float uWaveFrequency;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;

void main() {
  vUv = uv;
  
  // Gerstner波浪
  vec3 pos = position;
  float wave1 = sin(pos.x * uWaveFrequency + uTime) * uWaveHeight;
  float wave2 = sin(pos.z * uWaveFrequency * 0.8 + uTime * 1.2) * uWaveHeight * 0.6;
  float wave3 = sin((pos.x + pos.z) * uWaveFrequency * 0.5 + uTime * 0.7) * uWaveHeight * 0.3;
  pos.y += wave1 + wave2 + wave3;
  
  // 计算法线
  float dx = cos(pos.x * uWaveFrequency + uTime) * uWaveHeight * uWaveFrequency;
  float dz = cos(pos.z * uWaveFrequency * 0.8 + uTime * 1.2) * uWaveHeight * 0.6 * uWaveFrequency * 0.8;
  vNormal = normalize(vec3(-dx, 1.0, -dz));
  
  vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(vWorldPosition, 1.0);
}
```

```glsl
// ocean.frag - 片元着色器
uniform vec3 uDeepColor;
uniform vec3 uShallowColor;
uniform vec3 uFresnelColor;
uniform samplerCube uEnvMap;
uniform float uFresnelPower;
uniform float uTime;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;

void main() {
  vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
  vec3 normal = normalize(vNormal);
  
  // 菲涅尔效应
  float fresnel = pow(1.0 - dot(viewDirection, normal), uFresnelPower);
  
  // 深浅水颜色混合
  float depth = smoothstep(0.0, 10.0, vWorldPosition.y + 5.0);
  vec3 waterColor = mix(uDeepColor, uShallowColor, depth);
  
  // 环境反射
  vec3 reflectDir = reflect(-viewDirection, normal);
  vec3 envColor = textureCube(uEnvMap, reflectDir).rgb;
  
  // 最终颜色
  vec3 finalColor = mix(waterColor, envColor, fresnel * 0.6);
  finalColor += uFresnelColor * fresnel * 0.3;
  
  // 焦散效果（简化版）
  float caustics = sin(vWorldPosition.x * 2.0 + uTime) * 
                   sin(vWorldPosition.z * 2.0 + uTime * 1.3) * 0.1;
  finalColor += vec3(caustics);
  
  gl_FragColor = vec4(finalColor, 0.9);
}
```

**参数配置**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| uDeepColor | vec3 | (0.0, 0.1, 0.3) | 深水颜色 |
| uShallowColor | vec3 | (0.0, 0.4, 0.6) | 浅水颜色 |
| uFresnelColor | vec3 | (0.8, 0.9, 1.0) | 菲涅尔高光色 |
| uWaveHeight | float | 2.0 | 波浪高度(米) |
| uWaveFrequency | float | 0.05 | 波浪频率 |
| uFresnelPower | float | 3.0 | 菲涅尔强度 |

**验收标准**

- [ ] 波浪动画流畅自然，无跳跃
- [ ] 从不同角度观察，反射效果变化合理
- [ ] 与天空盒环境光照协调
- [ ] 性能影响控制在5ms以内

---

#### 功能3：四大区域体量渲染

**功能描述**

基于建筑数据JSON，使用实例化渲染(InstancedMesh)程序化生成四大区域的建筑体量，用颜色编码区分建筑功能类型。

**用户价值**

- 准确呈现100万立方米的空间占比
- 数据驱动，便于修改和迭代
- 高性能渲染大量建筑

**数据结构设计**

```json
{
  "meta": {
    "totalVolume": 1000000,
    "unit": "m³",
    "scale": 1
  },
  "districts": {
    "coralStreet": {
      "id": "coral-street",
      "name": "珊瑚礁街",
      "nameEn": "Coral Reef Street",
      "position": [0, 0, 0],
      "totalVolume": 350000,
      "color": "#3498db",
      "buildings": [
        {
          "id": "cs-001",
          "name": "城市意识塔",
          "type": "landmark",
          "volume": 115000,
          "floors": 25,
          "floorHeight": 4,
          "footprint": 1150,
          "position": [0, 0, 0],
          "rotation": 0,
          "special": {
            "glow": true,
            "glowColor": "#00ffff",
            "glowIntensity": 2.0
          }
        },
        {
          "id": "cs-002",
          "name": "商业街区",
          "type": "commercial",
          "volume": 136072,
          "buildings": [
            {"name": "小超市", "volume": 4800, "count": 8},
            {"name": "餐饮(小)", "volume": 19600, "count": 60},
            {"name": "餐饮(大)", "volume": 15360, "count": 12}
          ]
        }
      ]
    },
    "sunValley": {
      "id": "sun-valley",
      "name": "阳光峡谷",
      "nameEn": "Sun Valley",
      "position": [-300, 0, 150],
      "totalVolume": 300000,
      "color": "#e67e22",
      "buildings": [
        {"id": "sv-001", "name": "智能温室", "type": "agriculture", "volume": 55800},
        {"id": "sv-002", "name": "垂直农场", "type": "agriculture", "volume": 45000},
        {"id": "sv-003", "name": "化学原料制造", "type": "industrial", "volume": 48081}
      ]
    },
    "forestHome": {
      "id": "forest-home",
      "name": "林语栖所",
      "nameEn": "Forest Home",
      "position": [0, 0, -250],
      "totalVolume": 267050,
      "color": "#27ae60",
      "buildings": [
        {"id": "fh-001", "name": "竹林公寓", "type": "residential", "volume": 78120},
        {"id": "fh-002", "name": "中式庭院别墅", "type": "residential", "volume": 142600}
      ]
    },
    "tidalLounge": {
      "id": "tidal-lounge",
      "name": "潮汐客厅",
      "nameEn": "Tidal Lounge",
      "position": [250, 0, 100],
      "totalVolume": 246670,
      "color": "#1abc9c",
      "floating": true,
      "buildings": [
        {"id": "tl-001", "name": "海景智能公寓", "type": "residential", "volume": 121520},
        {"id": "tl-002", "name": "水下酒店", "type": "hotel", "volume": 8400},
        {"id": "tl-003", "name": "小型核能发电船", "type": "energy", "volume": 20000}
      ]
    }
  },
  "buildingTypes": {
    "residential": {"color": "#3498db", "label": "居住"},
    "commercial": {"color": "#9b59b6", "label": "商业"},
    "industrial": {"color": "#e74c3c", "label": "工业"},
    "agriculture": {"color": "#27ae60", "label": "农业"},
    "energy": {"color": "#f39c12", "label": "能源"},
    "public": {"color": "#1abc9c", "label": "公共服务"},
    "landmark": {"color": "#00ffff", "label": "地标"}
  }
}
```

**程序化生成逻辑**

```javascript
class DistrictBuilder {
  constructor(districtData, buildingTypes) {
    this.data = districtData;
    this.types = buildingTypes;
    this.meshes = [];
  }
  
  generate() {
    const group = new THREE.Group();
    group.name = this.data.id;
    group.position.set(...this.data.position);
    
    // 为每种建筑类型创建实例化网格
    const buildingsByType = this.groupBuildingsByType();
    
    for (const [type, buildings] of Object.entries(buildingsByType)) {
      const instancedMesh = this.createInstancedMesh(type, buildings);
      group.add(instancedMesh);
    }
    
    return group;
  }
  
  createInstancedMesh(type, buildings) {
    const color = this.types[type]?.color || '#888888';
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.7,
      metalness: 0.1
    });
    
    // 使用基础几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.InstancedMesh(geometry, material, buildings.length);
    
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    
    buildings.forEach((building, i) => {
      // 根据体积计算尺寸
      const size = this.volumeToSize(building.volume);
      position.set(
        building.position?.[0] || (Math.random() - 0.5) * 100,
        size.y / 2,
        building.position?.[2] || (Math.random() - 0.5) * 100
      );
      scale.set(size.x, size.y, size.z);
      
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(i, matrix);
    });
    
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }
  
  volumeToSize(volume) {
    // 体积转尺寸：假设建筑宽深比为1:1.5
    const footprint = Math.pow(volume, 1/3) * 2;
    const width = footprint * 0.8;
    const depth = footprint * 1.2;
    const height = volume / (width * depth);
    return { x: width, y: height, z: depth };
  }
}
```

**验收标准**

- [ ] 四个区域的建筑体量比例与设计文档一致（误差<5%）
- [ ] 不同类型建筑颜色区分清晰
- [ ] 1000+建筑实例渲染帧率稳定
- [ ] 建筑数据修改后场景自动更新

---

#### 功能4：昼夜光照系统

**功能描述**

实现动态的昼夜循环光照系统，包含太阳/月亮位置变化、天空颜色渐变、环境光调整，营造不同时段的城市氛围。

**用户价值**

- 展示城市在不同时间的魅力（清晨的潮汐客厅、傍晚的阳光峡谷）
- 增加场景的动态感和生命力
- 为演示提供多样的视觉效果

**技术方案**

```javascript
class DayNightSystem {
  constructor(scene) {
    this.scene = scene;
    this.timeOfDay = 0.3; // 0-1, 0=午夜, 0.25=日出, 0.5=正午, 0.75=日落
    
    // 主光源（太阳/月亮）
    this.sunLight = new THREE.DirectionalLight(0xffffff, 1);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    scene.add(this.sunLight);
    
    // 环境光
    this.ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(this.ambientLight);
    
    // 半球光（天空-地面渐变）
    this.hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x8b4513, 0.3);
    scene.add(this.hemiLight);
    
    // 天空参数
    this.skyColors = {
      night: { sky: 0x0a0a20, ambient: 0x1a1a40, sun: 0x4444aa },
      dawn: { sky: 0xff7744, ambient: 0x664422, sun: 0xffaa44 },
      day: { sky: 0x87ceeb, ambient: 0x404040, sun: 0xffffff },
      dusk: { sky: 0xff6644, ambient: 0x442222, sun: 0xff8844 }
    };
  }
  
  setTime(time) {
    this.timeOfDay = time % 1;
    this.updateLighting();
  }
  
  updateLighting() {
    const t = this.timeOfDay;
    
    // 太阳位置（绕X轴旋转）
    const sunAngle = t * Math.PI * 2 - Math.PI / 2;
    const sunRadius = 500;
    this.sunLight.position.set(
      0,
      Math.sin(sunAngle) * sunRadius,
      Math.cos(sunAngle) * sunRadius
    );
    
    // 根据时间段插值颜色
    const colors = this.getInterpolatedColors(t);
    
    this.sunLight.color.setHex(colors.sun);
    this.sunLight.intensity = colors.sunIntensity;
    this.ambientLight.color.setHex(colors.ambient);
    this.hemiLight.color.setHex(colors.sky);
    
    // 更新场景背景
    this.scene.background = new THREE.Color(colors.sky);
  }
  
  getInterpolatedColors(t) {
    // 时间段划分
    // 0.00-0.20: 夜晚
    // 0.20-0.30: 黎明
    // 0.30-0.70: 白天
    // 0.70-0.80: 黄昏
    // 0.80-1.00: 夜晚
    
    if (t < 0.20 || t > 0.80) {
      return { ...this.skyColors.night, sunIntensity: 0.1 };
    } else if (t < 0.30) {
      const blend = (t - 0.20) / 0.10;
      return this.lerpColors(this.skyColors.night, this.skyColors.dawn, blend, 0.1, 0.8);
    } else if (t < 0.70) {
      const blend = (t - 0.30) / 0.40;
      if (blend < 0.5) {
        return this.lerpColors(this.skyColors.dawn, this.skyColors.day, blend * 2, 0.8, 1.0);
      } else {
        return this.lerpColors(this.skyColors.day, this.skyColors.dusk, (blend - 0.5) * 2, 1.0, 0.8);
      }
    } else {
      const blend = (t - 0.70) / 0.10;
      return this.lerpColors(this.skyColors.dusk, this.skyColors.night, blend, 0.8, 0.1);
    }
  }
  
  lerpColors(from, to, t, fromIntensity, toIntensity) {
    return {
      sky: this.lerpColor(from.sky, to.sky, t),
      ambient: this.lerpColor(from.ambient, to.ambient, t),
      sun: this.lerpColor(from.sun, to.sun, t),
      sunIntensity: fromIntensity + (toIntensity - fromIntensity) * t
    };
  }
  
  lerpColor(c1, c2, t) {
    const color1 = new THREE.Color(c1);
    const color2 = new THREE.Color(c2);
    return color1.lerp(color2, t).getHex();
  }
  
  // 动画循环
  animate(speed = 0.001) {
    this.setTime(this.timeOfDay + speed);
  }
}
```

**时间节点效果**

| 时间 | 数值 | 天空色 | 光照强度 | 适合展示 |
|------|------|--------|----------|----------|
| 午夜 | 0.00 | 深蓝 | 0.1 | 城市意识塔发光 |
| 黎明 | 0.25 | 橙红渐变 | 0.5 | 潮汐客厅日出 |
| 正午 | 0.50 | 蔚蓝 | 1.0 | 全景鸟瞰 |
| 黄昏 | 0.75 | 金橙 | 0.8 | 阳光峡谷夕照 |

**验收标准**

- [ ] 昼夜循环平滑过渡，无跳跃
- [ ] 阴影方向随太阳位置变化
- [ ] 夜间发光建筑效果突出
- [ ] 可通过UI控制时间或自动循环

---

#### 功能5：性能监控与调试系统

**功能描述**

提供完整的性能监控面板和开发调试工具，帮助优化渲染性能，展示技术指标。

**用户价值**

- 实时了解渲染性能状态
- 快速定位性能瓶颈
- 向评审展示技术细节

**功能界面设计**

```
┌─────────────────────────────────┐
│  Performance Monitor      [×]  │
├─────────────────────────────────┤
│  FPS: 60 ████████████████ 60   │
│  MS:  16.7ms                   │
│  MB:  128                      │
├─────────────────────────────────┤
│  Draw Calls: 156               │
│  Triangles: 1,234,567          │
│  Textures: 24                  │
│  Programs: 8                   │
├─────────────────────────────────┤
│  [ ] Wireframe                 │
│  [ ] Bounding Boxes            │
│  [ ] LOD Levels                │
│  [ ] Freeze Frustum            │
└─────────────────────────────────┘
```

**技术实现**

```javascript
class PerformanceMonitor {
  constructor(renderer) {
    this.renderer = renderer;
    this.stats = new Stats();
    this.gui = new GUI({ title: 'Performance Monitor' });
    
    this.metrics = {
      fps: 0,
      ms: 0,
      mb: 0,
      drawCalls: 0,
      triangles: 0,
      textures: 0,
      programs: 0
    };
    
    this.debug = {
      wireframe: false,
      boundingBoxes: false,
      lodLevels: false,
      freezeFrustum: false
    };
    
    this.setupGUI();
  }
  
  setupGUI() {
    // 性能指标文件夹
    const perfFolder = this.gui.addFolder('Metrics');
    perfFolder.add(this.metrics, 'fps').listen().name('FPS');
    perfFolder.add(this.metrics, 'ms').listen().name('Frame Time (ms)');
    perfFolder.add(this.metrics, 'drawCalls').listen().name('Draw Calls');
    perfFolder.add(this.metrics, 'triangles').listen().name('Triangles');
    
    // 调试选项文件夹
    const debugFolder = this.gui.addFolder('Debug');
    debugFolder.add(this.debug, 'wireframe').name('Wireframe').onChange(v => {
      this.setWireframe(v);
    });
    debugFolder.add(this.debug, 'boundingBoxes').name('Bounding Boxes');
    debugFolder.add(this.debug, 'lodLevels').name('Show LOD Levels');
    
    // 后处理效果文件夹
    const fxFolder = this.gui.addFolder('Post Processing');
    fxFolder.add({ ssao: true }, 'ssao').name('SSAO');
    fxFolder.add({ bloom: true }, 'bloom').name('Bloom');
    fxFolder.add({ fxaa: true }, 'fxaa').name('FXAA');
  }
  
  update() {
    this.stats.update();
    
    const info = this.renderer.info;
    this.metrics.drawCalls = info.render.calls;
    this.metrics.triangles = info.render.triangles;
    this.metrics.textures = info.memory.textures;
    this.metrics.programs = info.programs?.length || 0;
  }
  
  setWireframe(enabled) {
    this.renderer.domElement.parentElement.querySelectorAll('mesh').forEach(mesh => {
      if (mesh.material) {
        mesh.material.wireframe = enabled;
      }
    });
  }
}
```

**验收标准**

- [ ] FPS显示准确，更新流畅
- [ ] Draw Calls、Triangles等指标实时更新
- [ ] 调试选项可正常开关
- [ ] 后处理效果可独立控制
- [ ] UI不遮挡主要视觉区域

---

### 3.3 LOD（细节层次）系统

**功能描述**

根据相机距离自动切换建筑模型的细节层次，近处显示高精度模型，远处显示简化模型，优化渲染性能。

**LOD层级定义**

| 层级 | 距离范围 | 模型细节 | 面数占比 |
|------|----------|----------|----------|
| LOD0 | 0-100m | 完整细节 | 100% |
| LOD1 | 100-300m | 简化细节 | 50% |
| LOD2 | 300-600m | 基础形体 | 20% |
| LOD3 | 600m+ | 色块/Billboard | 5% |

**技术实现**

```javascript
class LODManager {
  constructor(camera) {
    this.camera = camera;
    this.lodGroups = [];
    
    this.distances = [0, 100, 300, 600];
  }
  
  createLODBuilding(buildingData) {
    const lod = new THREE.LOD();
    
    // LOD0: 详细模型
    const detailedGeom = this.createDetailedGeometry(buildingData);
    const detailedMesh = new THREE.Mesh(detailedGeom, this.getMaterial(buildingData));
    lod.addLevel(detailedMesh, 0);
    
    // LOD1: 简化模型
    const simplifiedGeom = this.createSimplifiedGeometry(buildingData);
    const simplifiedMesh = new THREE.Mesh(simplifiedGeom, this.getMaterial(buildingData));
    lod.addLevel(simplifiedMesh, 100);
    
    // LOD2: 基础盒子
    const boxGeom = new THREE.BoxGeometry(
      buildingData.width,
      buildingData.height,
      buildingData.depth
    );
    const boxMesh = new THREE.Mesh(boxGeom, this.getMaterial(buildingData));
    lod.addLevel(boxMesh, 300);
    
    // LOD3: 超远距离精灵
    const sprite = this.createBillboard(buildingData);
    lod.addLevel(sprite, 600);
    
    this.lodGroups.push(lod);
    return lod;
  }
  
  update() {
    this.lodGroups.forEach(lod => {
      lod.update(this.camera);
    });
  }
}
```

**验收标准**

- [ ] LOD切换平滑，无明显跳跃
- [ ] 远距离建筑渲染面数显著降低
- [ ] LOD切换距离可配置
- [ ] 调试模式可显示当前LOD层级

---

## 4. 非功能需求

### 4.1 性能要求

**帧率要求**

| 设备类型 | 目标帧率 | 最低帧率 | 测试条件 |
|----------|----------|----------|----------|
| 桌面端(独显) | 60fps | 30fps | 1080p, 全特效 |
| 桌面端(核显) | 30fps | 20fps | 1080p, 中特效 |
| 移动端(高端) | 30fps | 20fps | 720p, 低特效 |
| 移动端(中端) | 20fps | 15fps | 540p, 最低特效 |

**资源限制**

| 指标 | 限制值 | 说明 |
|------|--------|------|
| 初始加载大小 | <10MB | 首屏资源 |
| 总资源大小 | <50MB | 含所有贴图 |
| 内存占用 | <512MB | 运行时峰值 |
| Draw Calls | <300 | 单帧调用 |
| Triangles | <2M | 单帧三角形 |

**加载时间**

| 阶段 | 目标时间 | 最大时间 |
|------|----------|----------|
| 首屏渲染 | <3s | 5s |
| 全部加载 | <10s | 15s |
| 区域切换 | <0.5s | 1s |

### 4.2 兼容性要求

**浏览器支持**

| 浏览器 | 最低版本 | 渲染器 |
|--------|----------|--------|
| Chrome | 90+ | WebGL2/WebGPU |
| Firefox | 90+ | WebGL2 |
| Safari | 15+ | WebGL2 |
| Edge | 90+ | WebGL2/WebGPU |

**设备适配**

- 屏幕尺寸：320px - 4K
- 设备类型：桌面、平板、手机
- 触控支持：是
- 横竖屏：自适应

**降级策略**

```javascript
class CompatibilityManager {
  constructor() {
    this.capabilities = this.detectCapabilities();
    this.qualityLevel = this.determineQuality();
  }
  
  detectCapabilities() {
    return {
      webgl2: !!document.createElement('canvas').getContext('webgl2'),
      webgpu: 'gpu' in navigator,
      maxTextureSize: this.getMaxTextureSize(),
      isMobile: /Android|iPhone|iPad/i.test(navigator.userAgent),
      devicePixelRatio: window.devicePixelRatio || 1
    };
  }
  
  determineQuality() {
    const { webgl2, isMobile, maxTextureSize } = this.capabilities;
    
    if (!webgl2) return 'minimal';
    if (isMobile) return 'low';
    if (maxTextureSize < 4096) return 'medium';
    return 'high';
  }
  
  getQualityPreset() {
    const presets = {
      minimal: {
        shadowMapSize: 512,
        ssao: false,
        bloom: false,
        waterReflection: false,
        lodMultiplier: 0.5
      },
      low: {
        shadowMapSize: 1024,
        ssao: false,
        bloom: true,
        waterReflection: false,
        lodMultiplier: 0.7
      },
      medium: {
        shadowMapSize: 2048,
        ssao: true,
        bloom: true,
        waterReflection: true,
        lodMultiplier: 1.0
      },
      high: {
        shadowMapSize: 4096,
        ssao: true,
        bloom: true,
        waterReflection: true,
        lodMultiplier: 1.5
      }
    };
    
    return presets[this.qualityLevel];
  }
}
```

### 4.3 可维护性要求

**代码规范**

- ESLint + Prettier 统一代码风格
- TypeScript 类型检查（可选）
- 模块化架构，单一职责原则
- 关键函数必须有JSDoc注释

**文档要求**

- README.md：项目说明、安装运行
- ARCHITECTURE.md：架构设计说明
- API.md：公共接口文档
- 内联注释：复杂逻辑必须注释

---

## 5. 技术架构

### 5.1 整体架构

```
┌────────────────────────────────────────────────────────────────┐
│                          Application                           │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      UI Layer                             │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │ InfoPanel   │  │ ControlsUI  │  │ DebugPanel  │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  └──────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Scene Layer                            │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │ Districts   │  │ Terrain     │  │ Ocean       │       │  │
│  │  │ Manager     │  │ Manager     │  │ Manager     │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │ Lighting    │  │ Particles   │  │ LOD         │       │  │
│  │  │ System      │  │ System      │  │ Manager     │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  └──────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Render Layer                            │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │ WebGL       │  │ PostProcess │  │ Shader      │       │  │
│  │  │ Renderer    │  │ Pipeline    │  │ Manager     │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  └──────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Core Layer                             │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │ Scene       │  │ Camera      │  │ Event       │       │  │
│  │  │ Manager     │  │ Controller  │  │ Bus         │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  └──────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Data Layer                             │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │ buildings   │  │ terrain     │  │ config      │       │  │
│  │  │ .json       │  │ .json       │  │ .json       │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

### 5.2 目录结构

```
xuanyi-city-3d/
├── public/
│   ├── textures/
│   │   ├── heightmap.png          # 地形高度图
│   │   ├── terrain_diffuse.jpg    # 地形漫反射贴图
│   │   ├── water_normal.jpg       # 水面法线贴图
│   │   └── envmap/                # 环境贴图(6面)
│   │       ├── px.jpg
│   │       ├── nx.jpg
│   │       ├── py.jpg
│   │       ├── ny.jpg
│   │       ├── pz.jpg
│   │       └── nz.jpg
│   └── models/                    # 预制模型(可选)
│       └── landmark_tower.glb
├── src/
│   ├── core/
│   │   ├── Application.js         # 应用入口
│   │   ├── SceneManager.js        # 场景管理
│   │   ├── CameraController.js    # 相机控制
│   │   └── EventBus.js            # 事件总线
│   ├── render/
│   │   ├── WebGLRenderer.js       # 渲染器封装
│   │   ├── PostProcessPipeline.js # 后处理管线
│   │   ├── ShaderManager.js       # 着色器管理
│   │   └── shaders/
│   │       ├── ocean.vert
│   │       ├── ocean.frag
│   │       ├── glow.vert
│   │       └── glow.frag
│   ├── scene/
│   │   ├── TerrainManager.js      # 地形管理
│   │   ├── OceanManager.js        # 海洋管理
│   │   ├── DistrictsManager.js    # 区域管理
│   │   ├── LightingSystem.js      # 光照系统
│   │   ├── ParticleSystem.js      # 粒子系统
│   │   └── LODManager.js          # LOD管理
│   ├── districts/
│   │   ├── DistrictBase.js        # 区域基类
│   │   ├── CoralStreet.js         # 珊瑚礁街
│   │   ├── SunValley.js           # 阳光峡谷
│   │   ├── ForestHome.js          # 林语栖所
│   │   └── TidalLounge.js         # 潮汐客厅
│   ├── ui/
│   │   ├── InfoPanel.js           # 信息面板
│   │   ├── ControlsUI.js          # 控制面板
│   │   ├── DebugPanel.js          # 调试面板
│   │   └── LoadingScreen.js       # 加载界面
│   ├── utils/
│   │   ├── BuildingGenerator.js   # 建筑生成器
│   │   ├── CompatibilityManager.js# 兼容性管理
│   │   ├── PerformanceMonitor.js  # 性能监控
│   │   └── AssetLoader.js         # 资源加载器
│   ├── data/
│   │   ├── buildings.json         # 建筑数据
│   │   ├── terrain.json           # 地形配置
│   │   └── config.json            # 全局配置
│   ├── styles/
│   │   └── main.css               # 样式文件
│   ├── App.js                     # 主应用组件
│   └── main.js                    # 入口文件
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── ARCHITECTURE.md
└── .eslintrc.js
```

### 5.3 技术选型

| 类别 | 技术方案 | 版本 | 说明 |
|------|----------|------|------|
| 构建工具 | Vite | 5.x | 快速开发体验 |
| 渲染引擎 | Three.js | r169+ | WebGL/WebGPU |
| 后处理 | postprocessing | 6.x | 高性能后处理 |
| UI控制 | lil-gui | 0.19+ | 轻量GUI库 |
| 性能监控 | stats.js | r17 | FPS监控 |
| 代码规范 | ESLint + Prettier | - | 代码质量 |

### 5.4 关键技术决策

**决策1：选择Three.js而非Babylon.js**

| 因素 | Three.js | Babylon.js |
|------|----------|------------|
| 学习曲线 | 较低 | 较高 |
| 社区资源 | 极丰富 | 丰富 |
| 包体积 | 较小 | 较大 |
| 着色器自由度 | 高 | 中 |
| **结论** | ✅ 选择 | |

**决策2：使用Vite而非Webpack**

| 因素 | Vite | Webpack |
|------|------|---------|
| 开发启动速度 | 极快 | 慢 |
| HMR速度 | 极快 | 中等 |
| 配置复杂度 | 低 | 高 |
| 生态成熟度 | 成熟 | 非常成熟 |
| **结论** | ✅ 选择 | |

**决策3：渲染管线架构**

采用Composer模式的后处理管线，而非自定义帧缓冲：
- 优势：易于扩展、效果可独立开关、社区成熟方案
- 劣势：轻微性能开销
- 结论：对于MVP阶段，可维护性优先于极致性能

---

## 6. 项目规划

### 6.1 里程碑计划

| 里程碑 | 交付物 | 负责人 | 预计完成 | 状态 |
|--------|--------|--------|----------|------|
| M1: 项目初始化 | 项目框架、基础渲染 | 开发 | D+1 | 待开始 |
| M2: 地形与海洋 | 地形系统、海洋着色器 | 开发 | D+3 | 待开始 |
| M3: 区域建筑 | 四大区域体量渲染 | 开发 | D+5 | 待开始 |
| M4: 光照与效果 | 昼夜系统、后处理 | 开发 | D+7 | 待开始 |
| M5: 交互与UI | 相机控制、信息面板 | 开发 | D+9 | 待开始 |
| M6: 优化与测试 | 性能优化、兼容测试 | 开发 | D+11 | 待开始 |
| M7: 发布 | 部署上线 | 开发 | D+12 | 待开始 |

### 6.2 详细任务拆解

**M1: 项目初始化 (Day 1)**

| 任务 | 预估时长 | 优先级 |
|------|----------|--------|
| Vite项目搭建 | 0.5h | P0 |
| Three.js集成 | 0.5h | P0 |
| 基础场景创建 | 1h | P0 |
| OrbitControls配置 | 0.5h | P0 |
| 目录结构搭建 | 0.5h | P0 |

**M2: 地形与海洋 (Day 2-3)**

| 任务 | 预估时长 | 优先级 |
|------|----------|--------|
| 高度图地形生成 | 2h | P0 |
| 地形材质 | 1h | P1 |
| 海洋平面创建 | 0.5h | P0 |
| 海洋着色器-波浪 | 3h | P0 |
| 海洋着色器-反射 | 2h | P1 |
| 海洋着色器-焦散 | 1.5h | P2 |

**M3: 区域建筑 (Day 4-5)**

| 任务 | 预估时长 | 优先级 |
|------|----------|--------|
| 建筑数据JSON编写 | 2h | P0 |
| 建筑生成器 | 3h | P0 |
| 实例化渲染 | 2h | P0 |
| 区域颜色编码 | 1h | P1 |
| 城市意识塔特效 | 2h | P1 |

**M4: 光照与效果 (Day 6-7)**

| 任务 | 预估时长 | 优先级 |
|------|----------|--------|
| 昼夜循环系统 | 3h | P0 |
| 后处理管线搭建 | 2h | P0 |
| SSAO效果 | 1h | P1 |
| Bloom效果 | 1h | P1 |
| 天空盒/天空着色器 | 2h | P1 |

**M5: 交互与UI (Day 8-9)**

| 任务 | 预估时长 | 优先级 |
|------|----------|--------|
| 信息面板UI | 2h | P1 |
| 效果控制面板 | 2h | P1 |
| 性能监控面板 | 1h | P1 |
| 加载进度界面 | 1h | P1 |
| 调试工具 | 2h | P2 |

**M6: 优化与测试 (Day 10-11)**

| 任务 | 预估时长 | 优先级 |
|------|----------|--------|
| LOD系统实现 | 3h | P1 |
| 性能分析优化 | 2h | P0 |
| 移动端适配 | 2h | P2 |
| 跨浏览器测试 | 2h | P0 |
| Bug修复 | 3h | P0 |

**M7: 发布 (Day 12)**

| 任务 | 预估时长 | 优先级 |
|------|----------|--------|
| 生产构建配置 | 1h | P0 |
| 部署上线 | 1h | P0 |
| README完善 | 1h | P1 |
| 演示视频录制 | 1h | P1 |

### 6.3 风险与应对

| 风险 | 可能性 | 影响 | 应对措施 |
|------|--------|------|----------|
| 海洋着色器性能不佳 | 中 | 高 | 准备简化版着色器备选 |
| 移动端兼容问题 | 高 | 中 | 降级渲染策略，优先保证桌面端 |
| 建筑数据整理耗时 | 中 | 中 | 先用简化数据，后期完善 |
| Three.js版本兼容 | 低 | 中 | 锁定版本，充分测试 |
| 开发时间不足 | 中 | 高 | P2功能可延后，优先保证P0/P1 |

---

## 7. 验收标准

### 7.1 功能验收

| 功能模块 | 验收标准 | 验收方式 |
|----------|----------|----------|
| 渲染管线 | 后处理效果正常，可独立开关 | 功能测试 |
| 海洋系统 | 波浪动画流畅，反射效果自然 | 视觉评审 |
| 建筑渲染 | 体量比例正确，颜色区分清晰 | 数据对比 |
| 昼夜系统 | 光照平滑过渡，阴影正确 | 功能测试 |
| 相机控制 | 交互流畅，无穿透 | 操作测试 |
| UI面板 | 功能完整，不遮挡视野 | 功能测试 |

### 7.2 性能验收

| 指标 | 目标值 | 测试环境 | 验收方式 |
|------|--------|----------|----------|
| 桌面FPS | ≥60fps | GTX1060, 1080p | 性能监控 |
| 移动FPS | ≥30fps | iPhone12, Safari | 性能监控 |
| 首屏加载 | ≤3s | 4G网络 | 网络测试 |
| 内存占用 | ≤512MB | Chrome | 开发者工具 |

### 7.3 兼容性验收

| 环境 | 验收标准 |
|------|----------|
| Chrome 90+ | 全功能正常 |
| Firefox 90+ | 全功能正常 |
| Safari 15+ | 全功能正常，WebGPU可降级 |
| Edge 90+ | 全功能正常 |
| iOS Safari | 核心功能正常，效果可降级 |
| Android Chrome | 核心功能正常，效果可降级 |

---

## 8. 附录

### 8.1 名词解释

| 术语 | 解释 |
|------|------|
| PBR | Physically Based Rendering，基于物理的渲染 |
| HDR | High Dynamic Range，高动态范围 |
| SSAO | Screen Space Ambient Occlusion，屏幕空间环境光遮蔽 |
| Bloom | 泛光效果，使高亮区域产生光晕 |
| LOD | Level of Detail，细节层次，根据距离切换模型精度 |
| InstancedMesh | 实例化网格，高效渲染大量相同几何体 |
| ShaderMaterial | 自定义着色器材质 |
| PostProcessing | 后处理，在渲染完成后对图像进行处理 |
| Heightmap | 高度图，用灰度值表示地形高度 |
| Normal Map | 法线贴图，用于增加表面细节 |

### 8.2 参考资料

**技术文档**
- [Three.js官方文档](https://threejs.org/docs/)
- [Three.js示例](https://threejs.org/examples/)
- [postprocessing文档](https://pmndrs.github.io/postprocessing/)
- [Shader教程 - The Book of Shaders](https://thebookofshaders.com/)

**参考项目**
- [Three.js Journey](https://threejs-journey.com/)
- [Polygon Runway](https://polygonrunway.com/)
- [Bruno Simon Portfolio](https://bruno-simon.com/)

**设计资料**
- 寻意城市环境设计文档（见附件）

### 8.3 建筑数据汇总

**体积分布（约100万m³）**

| 区域 | 体积(m³) | 占比 | 主要功能 |
|------|----------|------|----------|
| 珊瑚礁街 | ~350,000 | 35% | 商业、文化、中枢 |
| 阳光峡谷 | ~300,000 | 30% | 工业、农业、能源 |
| 林语栖所 | ~267,050 | 27% | 居住、教育、疗愈 |
| 潮汐客厅 | ~246,670 | 25% | 居住、科研、海洋 |
| 静谧花园 | ~30,000 | 3% | 疗愈、休闲 |
| 交通系统 | ~70,000 | 7% | 磁悬浮、步道 |

*注：总体积超过100万m³，需在后续版本中调整平衡*

---

## 9. Trae实现指南

### 9.1 Trae Builder Prompt - 阶段一

```
请创建一个Three.js项目，实现"寻意城市"3D可视化MVP：

技术栈：
- Vite 5.x 构建工具
- Three.js r169+
- postprocessing 后处理库
- lil-gui 控制面板
- stats.js 性能监控

核心需求：
1. 高质量渲染管线
   - WebGLRenderer + EffectComposer
   - SSAO、Bloom、FXAA后处理
   - ACESFilmic色调映射
   
2. 海洋着色器
   - Gerstner波浪动画
   - 菲涅尔反射
   - 使用ShaderMaterial
   
3. 四大区域体量
   - 珊瑚礁街(中央，蓝色)
   - 阳光峡谷(西南，橙色)
   - 林语栖所(北部，绿色)
   - 潮汐客厅(东南，青色，漂浮)
   - 使用InstancedMesh高性能渲染
   
4. 昼夜光照系统
   - 太阳位置动态变化
   - 天空颜色渐变
   - 可控制时间

5. 控制面板
   - 后处理效果开关
   - 时间控制滑块
   - 性能监控显示

请按照以下目录结构组织代码...
```

### 9.2 Trae Chat迭代建议

**迭代1：海洋效果增强**
```
当前海洋波浪效果较单一，请：
1. 添加多层叠加的Gerstner波
2. 增加泡沫效果（岸边）
3. 优化反射清晰度
```

**迭代2：建筑特效**
```
为城市意识塔添加发光效果：
1. 使用MeshBasicMaterial + Bloom
2. 添加向上流动的粒子
3. 夜间效果更突出
```

**迭代3：性能优化**
```
当前帧率不稳定，请：
1. 实现LOD系统
2. 优化DrawCalls
3. 添加视锥体剔除
```

---

*文档结束*

*版本: V1.0 | 作者: Pong / Claude | 日期: 2025-12-05*
