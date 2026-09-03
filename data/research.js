window.RESEARCH_DATA = {
  "source": "沿用前一階段（Phase 2）已由實驗室負責人確認之研究方向文字，未經修改。",
  "pageIntro": {
    "zh": "本實驗室致力於結合電腦視覺與機器學習技術，發展面向海事場域的視覺感知方法，並著重於邊緣運算與嵌入式系統的實作。",
    "en": "Our research brings together computer vision and machine learning for maritime visual perception, with an emphasis on edge and embedded implementation."
  },
  "headings": {
    "approaches": { "zh": "代表性方法", "en": "Representative Approaches" },
    "applications": { "zh": "應用領域", "en": "Application Areas" }
  },
  "areas": [
    {
      "id": "computer-vision",
      "role": "FOUNDATION",
      "name_zh": "電腦視覺",
      "name_en": "Computer Vision",
      "status_zh": "持續支持中",
      "status_en": "Current — supported",
      "desc_zh": "作為實驗室方法論的基礎，涵蓋影像處理、前景/背景分離與視覺特徵擷取等核心技術。",
      "desc_en": "Foundational techniques including image processing, foreground/background separation, and visual feature extraction."
    },
    {
      "id": "maritime-visual-perception",
      "role": "CORE_DOMAIN",
      "name_zh": "海事視覺感知",
      "name_en": "Maritime Visual Perception",
      "status_zh": "目前主力方向",
      "status_en": "Current — strong focus",
      "desc_zh": "實驗室的核心應用領域，聚焦於開闊海域環境下的目標偵測、船舶分類與監控應用。",
      "desc_en": "The lab's core application domain: detection, classification, and surveillance in open-sea environments."
    },
    {
      "id": "machine-learning",
      "role": "METHODOLOGY",
      "name_zh": "機器學習",
      "name_en": "Machine Learning",
      "status_zh": "持續支持中",
      "status_en": "Current — supported",
      "desc_zh": "以集成學習（Ensemble Learning）為主要方法論工具，支援上述視覺感知任務。",
      "desc_en": "Ensemble learning as a primary methodological tool supporting the visual perception tasks above."
    },
    {
      "id": "edge-computing",
      "role": "DEPLOYMENT",
      "name_zh": "邊緣運算",
      "name_en": "Edge Computing",
      "status_zh": "目前主力方向",
      "status_en": "Current — strong focus",
      "desc_zh": "將前述方法部署至邊緣裝置與嵌入式系統，實現即時、低功耗的海事視覺感知應用。",
      "desc_en": "Deploying the above methods on edge and embedded systems for real-time, low-power maritime perception."
    }
  ],
  "applicationAreas": [
    {
      "zh": "邊緣式海事前景偵測",
      "en": "Edge-based Maritime Foreground Detection",
      "note_zh": "目前主要的邊緣運算應用方向。"
    },
    {
      "zh": "無人水面載具（USV）導航與避碰",
      "en": "USV Navigation & Collision Avoidance"
    },
    {
      "zh": "船舶分類",
      "en": "Maritime Vehicle Classification"
    }
  ],
  "note_zh": "",
  "recentHighlightsNote_zh": "",
  "recentHighlights": [
    {
      "id": "hl-2026-pgme",
      "year": "2026.08",
      "title": "PGME: A LUT-Indexed Visual-Refinement Module for Embedded Maritime Perception",
      "venue": "IEEE Embedded Systems Letters",
      "doi": "10.1109/LES.2026.3710867",
      "summary_zh": "本研究提出「透視引導形態彈性模組」（PGME），一種免GPU、可於邊緣裝置即時運行的視覺精煉技術，利用透視幾何線索依影像列別調整形態學運算子半徑，並以查找表索引達成常數時間運算，有效兼顧遠方小目標保留與近場浪花雜訊抑制。於SMD、IPATCH海事資料集驗證，在Jetson Xavier NX平台以3.11 FPS、5.38瓦特運行，適合固定或準靜態視角之海事邊緣感知前處理模組。",
      "media": { "type": "video", "youtubeId": "ZVuSZk5NJL4", "src": "assets/video/vga/pgme.mp4", "poster": "assets/img/ga/pgme.png" }
    },
    {
      "id": "hl-2026-eets",
      "year": "2026.05",
      "title": "Energy-Efficient Temporal Adaptive Threshold Method for High-Frame-Rate Maritime Foreground Detection Using Edge CPUs",
      "venue": "IEEE Embedded Systems Letters",
      "doi": "10.1109/LES.2026.3690721",
      "summary_zh": "本研究提出「時序自適應閾值前景偵測」（T-ATFD）框架，專為邊緣CPU平台上全天候運作之海事即時感知設計。在Jetson Xavier NX與IPATCH資料集測試中，達到79.2 FPS、系統功耗僅5.55瓦，相較於DeepLabV3-MobileNet深度學習基準的1.37 FPS大幅提升即時性；可作為低功耗前端感知，觸發後端深度學習推論，滿足無人水面載具24小時能源受限之部署需求。",
      "media": { "type": "video", "youtubeId": "5LPdGUydFfg", "src": "assets/video/vga/eets.mp4", "poster": "assets/img/ga/eets.png" }
    },
    {
      "id": "hl-2024-cviu",
      "year": "2024.01",
      "title": "Ensemble learning-based method for maritime background subtraction in open sea environments",
      "venue": "Computer Vision and Image Understanding",
      "doi": "10.1016/j.cviu.2023.103859",
      "summary_zh": "本研究提出以集成學習整合多種異質背景相減方法之海事前景偵測技術，並結合海上濾波模組抑制反光、船跡等雜訊，強化背景模型於複雜動態海象下的穩健性。於Maritime BS Benchmark資料集實驗顯示，本方法在即時偵測準確率上優於現有方法，有助提升自主船舶於開闊海域之環境感知能力，強化海事運輸安全。",
      "media": { "type": "image", "src": "assets/img/ga/cviu2024.png", "caption_zh": "系統架構圖：集成學習背景相減方法之偵測與集成模組流程" }
    },
    {
      "id": "hl-2021-spic",
      "year": "2021.11",
      "title": "Maritime Filtering for Images and Videos",
      "venue": "Signal Processing: Image Communication",
      "doi": "10.1016/j.image.2021.116477",
      "summary_zh": "本研究提出基於暗通道先驗與海面特性觀察的「海事雜訊先驗」（MNP），發展一套非迭代、非線性的通用海事濾波技術，用以抑制船跡、水面反光等海事影像雜訊。實驗於多個公開資料集驗證，套用本濾波法可使既有背景相減演算法之效能提升36.6%至50.63%，適用於海事監控之影像分割與前景偵測應用。",
      "media": { "type": "image", "src": "assets/img/ga/spic2021.png", "caption_zh": "海事雜訊先驗（MNP）濾波流程：由原始影像計算物件信心圖" }
    },
    {
      "id": "hl-2021-cviu",
      "year": "2021.01",
      "title": "Comprehensive comparative evaluation of background subtraction algorithms in open sea environments",
      "venue": "Computer Vision and Image Understanding",
      "doi": "10.1016/j.cviu.2020.103101",
      "summary_zh": "本研究針對開闊海域環境，系統性比較37種背景相減演算法之效能，並歷時約兩年逐像素標註IPATCH資料集建立海事評測基準，提出更新之演算法分類架構。同時提出「劇烈雜訊移除法」（DNRM），可將整體偵測效能提升19.84%至31.86%，為海事智慧監控與自主船舶選用合適背景相減方法提供實證依據。",
      "media": { "type": "image", "src": "assets/img/ga/cviu2021.png", "caption_zh": "可見光與熱像儀之標註範例（Ground Truth）" }
    },
    {
      "id": "hl-2019-jei",
      "year": "2019.01",
      "title": "Deep learning-based scene-awareness approach for intelligent change detection in videos",
      "venue": "Journal of Electronic Imaging",
      "doi": "10.1117/1.JEI.28.1.013038",
      "summary_zh": "本研究提出結合深度學習場景辨識與支援向量機之「場景感知」變化偵測方法，先自動判別監控場景類型，再依場景特性動態切換合適的偵測技術，克服單一方法難以適應多變場景的限制。實驗結果顯示其偵測效能與當代方法相當，且滿足即時應用需求，可作為視訊監控系統中智慧型變化偵測的解決方案。",
      "media": { "type": "image", "src": "assets/img/ga/jei2019.png", "caption_zh": "深度學習場景感知變化偵測流程圖" }
    }
  ]
}
;
