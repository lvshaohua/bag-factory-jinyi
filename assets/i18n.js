// i18n.js - Multi-language engine for Bag Factory website
// Supports: zh-CN (Chinese), en (English)
// Features: IP auto-detection, manual switch, localStorage persistence

(function() {
  'use strict';

  // ===================== Translation Data =====================
  const TRANSLATIONS = {
    // ===== Common / Navigation =====
    'nav_home': { 'zh': '首页', 'en': 'Home' },
    'nav_products': { 'zh': '产品中心', 'en': 'Products' },
    'nav_process': { 'zh': '定制流程', 'en': 'Process' },
    'nav_about': { 'zh': '关于我们', 'en': 'About' },
    'nav_contact': { 'zh': '立即咨询', 'en': 'Inquiry' },
    'nav_menu': { 'zh': '打开菜单', 'en': 'Open Menu' },
    'lang_zh': { 'zh': '中文', 'en': '中文' },
    'lang_en': { 'zh': 'English', 'en': 'English' },

    // ===== Footer =====
    'footer_products': { 'zh': '产品', 'en': 'Products' },
    'footer_services': { 'zh': '服务', 'en': 'Services' },
    'footer_contact': { 'zh': '联系我们', 'en': 'Contact' },
    'footer_canvas': { 'zh': '帆布袋', 'en': 'Canvas Bags' },
    'footer_nonwoven': { 'zh': '无纺布袋', 'en': 'Non-woven Bags' },
    'footer_tyvek': { 'zh': '杜邦纸袋', 'en': 'Tyvek Bags' },
    'footer_waterproof': { 'zh': '防水袋', 'en': 'Waterproof Bags' },
    'footer_process': { 'zh': '定制流程', 'en': 'Process' },
    'footer_about': { 'zh': '关于我们', 'en': 'About Us' },
    'footer_contact_us': { 'zh': '联系我们', 'en': 'Contact Us' },
    'footer_phone': { 'zh': '电话咨询', 'en': 'Phone' },
    'footer_whatsapp': { 'zh': 'WhatsApp咨询', 'en': 'WhatsApp' },
    'footer_email': { 'zh': '邮件咨询', 'en': 'Email' },
    'footer_hours': { 'zh': '工作日 8:00-18:00', 'en': 'Mon-Sat 8:00-18:00' },
    'footer_reply': { 'zh': '24小时内回复', 'en': 'Reply within 24h' },
    'footer_location': { 'zh': '上海市嘉定区', 'en': 'Jiading, Shanghai' },
    'footer_copyright': { 'zh': '© 2026 袋尚工坊 版权所有 | 上海市嘉定区专业袋类定制源头工厂', 'en': '© 2026 BagCraft Workshop. All rights reserved. | Custom bag factory in Jiading, Shanghai' },
    'footer_sitemap': { 'zh': '网站地图', 'en': 'Sitemap' },

    // ===== Modal Form =====
    'modal_title': { 'zh': '立即咨询', 'en': 'Get a Quote' },
    'modal_close': { 'zh': '关闭弹窗', 'en': 'Close' },
    'modal_name': { 'zh': '称呼', 'en': 'Name' },
    'modal_name_ph': { 'zh': '请输入您的称呼', 'en': 'Your name' },
    'modal_country': { 'zh': '国家', 'en': 'Country' },
    'modal_country_ph': { 'zh': '如：中国、美国', 'en': 'e.g. China, USA' },
    'modal_phone': { 'zh': '手机号', 'en': 'Phone' },
    'modal_phone_ph': { 'zh': '您的联系电话', 'en': 'Your phone number' },
    'modal_email': { 'zh': '邮箱', 'en': 'Email' },
    'modal_email_ph': { 'zh': 'your@email.com', 'en': 'your@email.com' },
    'modal_whatsapp': { 'zh': 'WhatsApp', 'en': 'WhatsApp' },
    'modal_whatsapp_ph': { 'zh': 'WhatsApp号码', 'en': 'WhatsApp number' },
    'modal_product': { 'zh': '产品类型', 'en': 'Product Type' },
    'modal_product_sel': { 'zh': '请选择', 'en': 'Select' },
    'modal_canvas': { 'zh': '帆布袋', 'en': 'Canvas Bag' },
    'modal_nonwoven': { 'zh': '无纺布袋', 'en': 'Non-woven Bag' },
    'modal_tyvek': { 'zh': '杜邦纸袋', 'en': 'Tyvek Bag' },
    'modal_waterproof': { 'zh': '防水袋', 'en': 'Waterproof Bag' },
    'modal_other': { 'zh': '其他', 'en': 'Other' },
    'modal_quantity': { 'zh': '预计数量', 'en': 'Quantity' },
    'modal_qty_sel': { 'zh': '请选择', 'en': 'Select' },
    'modal_qty_100': { 'zh': '100-500个', 'en': '100-500 pcs' },
    'modal_qty_500': { 'zh': '500-1000个', 'en': '500-1000 pcs' },
    'modal_qty_1000': { 'zh': '1000-5000个', 'en': '1000-5000 pcs' },
    'modal_qty_5000': { 'zh': '5000个以上', 'en': '5000+ pcs' },
    'modal_message': { 'zh': '需求描述', 'en': 'Requirements' },
    'modal_message_ph': { 'zh': '请描述您的需求...', 'en': 'Describe your needs...' },
    'modal_submit': { 'zh': '提交咨询', 'en': 'Submit Inquiry' },
    'modal_submitting': { 'zh': '提交中...', 'en': 'Submitting...' },
    'modal_success_title': { 'zh': '提交成功！', 'en': 'Submitted!' },
    'modal_success_msg': { 'zh': '我们将尽快与您联系，请保持联系方式畅通。', 'en': 'We will contact you soon. Please keep your contact info available.' },
    'modal_error_title': { 'zh': '提交失败', 'en': 'Submission Failed' },
    'modal_error_msg': { 'zh': '请稍后重试，或直接通过电话联系我们。', 'en': 'Please try again later or contact us by phone.' },
    'modal_net_error': { 'zh': '网络错误，请稍后重试或直接电话联系。', 'en': 'Network error. Please try again later or call us.' },
    'label_optional': { 'zh': '（选填）', 'en': '(Optional)' },
    'label_required': { 'zh': '*', 'en': '*' },

    // ===== Contact Page Form =====
    'contact_success': { 'zh': '提交成功！我们将尽快与您联系。', 'en': 'Submitted! We will contact you soon.' },
    'contact_fail': { 'zh': '提交失败', 'en': 'Submission failed' },
    'contact_net_error': { 'zh': '网络错误，请稍后重试。', 'en': 'Network error. Please try again.' },

    // ===== Index Page =====
    'index_title': { 'zh': '袋尚工坊 - 上海帆布袋无纺布袋杜邦纸袋批量定制源头厂家', 'en': 'BagCraft Workshop - Custom Canvas/Non-woven/Tyvek Bags Factory Shanghai' },
    'index_desc': { 'zh': '袋尚工坊位于上海市嘉定区，专业定制帆布袋、无纺布袋、杜邦纸袋。源头工厂直供，小批量100个起订，支持来图来样定制，7天快速交付。', 'en': 'BagCraft Workshop in Jiading, Shanghai. Custom canvas, non-woven and Tyvek bags. Factory direct, 100 pcs MOQ, custom designs welcome, 7-day delivery.' },
    'index_og_title': { 'zh': '袋尚工坊 - 上海袋类批量定制源头厂家', 'en': 'BagCraft Workshop - Bulk Custom Bag Factory Shanghai' },
    'index_og_desc': { 'zh': '专业定制帆布袋、无纺布袋、杜邦纸袋，小批量100个起订，源头工厂直供', 'en': 'Custom canvas, non-woven & Tyvek bags. 100 pcs MOQ, factory direct from Shanghai.' },
    'index_badge': { 'zh': '上海市嘉定区 · 源头工厂', 'en': 'Jiading, Shanghai · Factory Direct' },
    'index_hero_h1': { 'zh': '您的品牌，<em>印</em>在每一只袋子上', 'en': 'Your Brand, <em>Printed</em> on Every Bag' },
    'index_hero_p': { 'zh': '专注帆布袋、无纺布袋、杜邦纸袋的批量定制生产。支持来图来样定制，多种印刷工艺可选，<strong>100个起订</strong>，让品牌传播触手可及。', 'en': 'Specializing in bulk custom canvas, non-woven & Tyvek bags. Send your design, multiple printing options, <strong>100 pcs MOQ</strong>. Make your brand visible everywhere.' },
    'index_btn_quote': { 'zh': '获取报价', 'en': 'Get Quote' },
    'index_btn_browse': { 'zh': '浏览产品', 'en': 'Browse Products' },
    'index_stat_years': { 'zh': '年行业经验', 'en': 'Years Experience' },
    'index_stat_clients': { 'zh': '合作客户', 'en': 'Clients Served' },
    'index_stat_output': { 'zh': '年产量', 'en': 'Annual Output' },
    'index_products_tag': { 'zh': '产品中心', 'en': 'Products' },
    'index_products_h2': { 'zh': '三大品类，满足多元定制需求', 'en': 'Three Categories, Endless Possibilities' },
    'index_products_p': { 'zh': '从日常购物到户外防水，从环保帆布袋到高端杜邦纸袋，我们提供全品类袋类定制解决方案', 'en': 'From daily shopping to outdoor waterproofing, from eco canvas to premium Tyvek — full range bag customization.' },
    'index_canvas_title': { 'zh': '帆布袋', 'en': 'Canvas Bags' },
    'index_canvas_desc': { 'zh': '天然棉麻材质，环保耐用，适合购物袋、礼品袋、宣传袋等多种场景。支持丝印、热转印、刺绣等工艺。', 'en': 'Natural cotton/linen, eco-friendly and durable. Perfect for shopping, gift, and promo bags. Supports screen print, heat transfer, embroidery.' },
    'index_canvas_tag': { 'zh': '环保材质', 'en': 'Eco Material' },
    'index_nonwoven_title': { 'zh': '无纺布袋', 'en': 'Non-woven Bags' },
    'index_nonwoven_desc': { 'zh': '经济实用的环保选择，防水防潮，承重能力强。适合超市购物、展会宣传、活动赠品等大批量需求。', 'en': 'Cost-effective eco choice, water-resistant, strong load-bearing. Ideal for supermarkets, trade shows, events in large quantities.' },
    'index_nonwoven_tag': { 'zh': '高性价比', 'en': 'Best Value' },
    'index_tyvek_title': { 'zh': '杜邦纸袋', 'en': 'Tyvek Bags' },
    'index_tyvek_desc': { 'zh': 'Tyvek材质，兼具纸张与织物的特性，轻薄强韧、防水透气。独特的纹理质感，打造高端品牌形象。', 'en': 'Tyvek material combines paper and fabric traits — light, strong, waterproof, breathable. Unique texture for premium brand image.' },
    'index_tyvek_tag': { 'zh': '高端质感', 'en': 'Premium' },
    'index_waterproof_title': { 'zh': '防水袋', 'en': 'Waterproof Bags' },
    'index_waterproof_desc': { 'zh': '采用PVC、TPU等防水材质，密封性强，适合户外运动、游泳、漂流等场景。可定制品牌Logo和图案。', 'en': 'PVC/TPU waterproof materials with strong sealing. Perfect for outdoor sports, swimming, rafting. Custom logo and patterns available.' },
    'index_waterproof_tag': { 'zh': '户外专用', 'en': 'Outdoor' },
    'index_view_all': { 'zh': '查看全部产品', 'en': 'View All Products' },
    'index_video_tag': { 'zh': '工厂实拍', 'en': 'Factory Tour' },
    'index_video_h2': { 'zh': '走进我们的生产车间', 'en': 'Inside Our Production Floor' },
    'index_video_p': { 'zh': '真实的工厂环境，专业的生产设备，严谨的质量管控', 'en': 'Real factory environment, professional equipment, strict quality control.' },
    'index_video_cut': { 'zh': '裁剪工序', 'en': 'Cutting' },
    'index_video_sew': { 'zh': '缝纫制作', 'en': 'Sewing' },
    'index_video_print': { 'zh': '印刷工艺', 'en': 'Printing' },
    'index_process_tag': { 'zh': '定制流程', 'en': 'Process' },
    'index_process_h2': { 'zh': '四步轻松完成定制', 'en': 'Four Steps to Customization' },
    'index_process_p': { 'zh': '从沟通需求到交付成品，我们提供一站式高效服务，让定制变得简单', 'en': 'From inquiry to delivery, we provide one-stop efficient service.' },
    'index_step1_title': { 'zh': '需求沟通', 'en': 'Consultation' },
    'index_step1_desc': { 'zh': '告诉我们您的需求：袋型、尺寸、数量、印刷内容。我们的专业顾问将为您提供最优方案建议。', 'en': 'Tell us your needs: bag type, size, quantity, print content. Our consultants will recommend the best solution.' },
    'index_step2_title': { 'zh': '设计确认', 'en': 'Design Confirmation' },
    'index_step2_desc': { 'zh': '发送您的Logo或设计稿，我们提供免费排版设计服务，确认效果图后再生产。', 'en': 'Send your logo or design. We provide free layout design service. Production starts after artwork approval.' },
    'index_step3_title': { 'zh': '打样生产', 'en': 'Sampling & Production' },
    'index_step3_desc': { 'zh': '支持先打样确认，满意后批量生产。先进设备保障品质，严格质检每一道工序。', 'en': 'Sample first, then bulk production. Advanced equipment ensures quality with strict QC at every step.' },
    'index_step4_title': { 'zh': '交付售后', 'en': 'Delivery & Support' },
    'index_step4_desc': { 'zh': '按时交付，支持多种物流方式。完善的售后服务，确保您的每一次合作都满意。', 'en': 'On-time delivery with multiple shipping options. Comprehensive after-sales service for your satisfaction.' },
    'index_process_detail': { 'zh': '了解详细流程', 'en': 'Learn More' },
    'index_features_tag': { 'zh': '核心优势', 'en': 'Why Us' },
    'index_features_h2': { 'zh': '为什么选择我们', 'en': 'Why Choose Us' },
    'index_features_p': { 'zh': '源头工厂直供，省去中间环节，品质与价格双重保障', 'en': 'Factory direct — no middlemen. Quality and price guaranteed.' },
    'index_feat_factory': { 'zh': '源头工厂', 'en': 'Factory Direct' },
    'index_feat_factory_desc': { 'zh': '自有生产基地位于上海市嘉定区，从原材料采购到成品出厂全程把控，无中间商赚差价，为您提供最具竞争力的价格。', 'en': 'Own production base in Jiading, Shanghai. Full control from raw materials to finished goods. No middlemen, most competitive prices.' },
    'index_feat_craft': { 'zh': '多种工艺', 'en': 'Multiple Techniques' },
    'index_feat_craft_desc': { 'zh': '丝网印刷、热转印、数码直喷、刺绣、烫金烫银等多种工艺可选，满足不同设计需求和预算。', 'en': 'Screen print, heat transfer, DTG, embroidery, foil stamping and more. Meet diverse design needs and budgets.' },
    'index_feat_moq': { 'zh': '小批量起做', 'en': 'Low MOQ' },
    'index_feat_moq_desc': { 'zh': '打破大批量门槛，100个起即可定制。适合初创品牌、活动推广、小批量测试等多种场景。', 'en': 'Break the bulk barrier — customize from 100 pcs. Perfect for startups, events, and small batch testing.' },
    'index_feat_speed': { 'zh': '快速交付', 'en': 'Fast Delivery' },
    'index_feat_speed_desc': { 'zh': '标准订单7-10天交付，加急订单可缩短至3-5天。高效生产线保障您的活动节点。', 'en': 'Standard orders 7-10 days. Rush orders 3-5 days. Efficient production ensures your event deadlines.' },
    'index_feat_quality': { 'zh': '品质保障', 'en': 'Quality Assured' },
    'index_feat_quality_desc': { 'zh': '严格的质量管理体系，从面料检验到成品抽检，确保每一只袋子都符合标准，不良率低于0.5%。', 'en': 'Strict quality management. From fabric inspection to final QC, every bag meets standards. Defect rate below 0.5%.' },
    'index_feat_service': { 'zh': '专属服务', 'en': 'Dedicated Service' },
    'index_feat_service_desc': { 'zh': '一对一客户经理全程跟进，从咨询到售后，及时响应您的每一个需求，让合作更省心。', 'en': 'One-on-one account manager from inquiry to after-sales. Responsive to every need for a worry-free partnership.' },
    'index_cta_h2': { 'zh': '准备好定制您的专属袋子了吗？', 'en': 'Ready to Customize Your Bags?' },
    'index_cta_p': { 'zh': '立即联系我们，获取免费报价和专业方案建议。您的品牌，值得被看见。', 'en': 'Contact us now for a free quote and professional advice. Your brand deserves to be seen.' },
    'index_cta_btn': { 'zh': '立即咨询', 'en': 'Get Started' },
    'index_footer_desc': { 'zh': '专注袋类定制生产12年，服务超过5000家企业客户。我们以专业的工艺、优质的服务、合理的价格，助力您的品牌传播。', 'en': '12 years in bag customization, serving 5000+ business clients. Professional craftsmanship, quality service, fair pricing.' },

    // ===== Products Page =====
    'products_title': { 'zh': '产品中心 - 帆布袋无纺布袋杜邦纸袋定制 | 袋尚工坊', 'en': 'Products - Custom Canvas/Non-woven/Tyvek Bags | BagCraft Workshop' },
    'products_desc': { 'zh': '袋尚工坊产品中心：帆布袋、无纺布袋、杜邦纸袋三大品类批量定制。上海市嘉定区源头工厂，100个起订，支持丝印热转印刺绣等多种工艺。', 'en': 'BagCraft Workshop products: canvas, non-woven & Tyvek bags. Jiading Shanghai factory, 100 pcs MOQ, multiple printing techniques.' },
    'products_og_title': { 'zh': '产品中心 - 袋尚工坊', 'en': 'Products - BagCraft Workshop' },
    'products_og_desc': { 'zh': '帆布袋、无纺布袋、杜邦纸袋三大品类批量定制', 'en': 'Three categories of custom bags in bulk quantities.' },
    'products_header_tag': { 'zh': '产品中心', 'en': 'Products' },
    'products_header_h1': { 'zh': '三大品类，满足多元定制需求', 'en': 'Three Categories, Endless Possibilities' },
    'products_header_p': { 'zh': '从日常购物到户外防水，从环保帆布袋到高端杜邦纸袋，全品类袋类定制解决方案', 'en': 'From daily shopping to outdoor waterproofing, eco canvas to premium Tyvek — complete bag solutions.' },
    'products_canvas_h2': { 'zh': '帆布袋', 'en': 'Canvas Bags' },
    'products_canvas_lead': { 'zh': '天然棉麻材质，环保耐用，是品牌宣传与日常使用的理想选择。', 'en': 'Natural cotton/linen, eco-friendly and durable. Ideal for branding and daily use.' },
    'products_canvas_p': { 'zh': '我们的帆布袋采用优质12安涤棉帆布，手感厚实，承重能力强。支持多种印刷工艺，可将您的品牌Logo、宣传语或创意图案完美呈现。', 'en': 'Our canvas bags use premium 12oz polyester-cotton canvas, thick and strong. Multiple printing techniques bring your brand to life.' },
    'products_canvas_scene': { 'zh': '适用场景', 'en': 'Use Cases' },
    'products_canvas_scene1': { 'zh': '品牌宣传袋、活动礼品袋', 'en': 'Brand promo bags, event gift bags' },
    'products_canvas_scene2': { 'zh': '购物袋、超市环保袋', 'en': 'Shopping bags, supermarket eco bags' },
    'products_canvas_scene3': { 'zh': '展会手提袋、会议资料袋', 'en': 'Trade show totes, conference bags' },
    'products_canvas_scene4': { 'zh': '文创周边、设计师品牌包装', 'en': 'Cultural creative merch, designer packaging' },
    'products_canvas_craft': { 'zh': '可选工艺', 'en': 'Techniques' },
    'products_canvas_quote': { 'zh': '咨询帆布袋报价', 'en': 'Quote for Canvas Bags' },
    'products_nonwoven_h2': { 'zh': '无纺布袋', 'en': 'Non-woven Bags' },
    'products_nonwoven_lead': { 'zh': '经济实用的环保选择，防水防潮，承重能力强。', 'en': 'Cost-effective eco choice, water-resistant with strong load-bearing.' },
    'products_nonwoven_p': { 'zh': '采用优质无纺布面料，可反复使用，是替代塑料袋的理想环保方案。适合大批量促销和宣传活动。', 'en': 'Quality non-woven fabric, reusable — ideal plastic bag alternative. Perfect for large-scale promotions.' },
    'products_nonwoven_scene': { 'zh': '适用场景', 'en': 'Use Cases' },
    'products_nonwoven_scene1': { 'zh': '超市购物袋、零售包装袋', 'en': 'Supermarket bags, retail packaging' },
    'products_nonwoven_scene2': { 'zh': '展会宣传袋、活动赠品袋', 'en': 'Exhibition promo bags, event giveaways' },
    'products_nonwoven_scene3': { 'zh': '教育培训袋、图书袋', 'en': 'Education bags, book bags' },
    'products_nonwoven_scene4': { 'zh': '医疗机构宣传袋', 'en': 'Medical institution promo bags' },
    'products_nonwoven_craft': { 'zh': '可选工艺', 'en': 'Techniques' },
    'products_nonwoven_quote': { 'zh': '咨询无纺布袋报价', 'en': 'Quote for Non-woven Bags' },
    'products_tyvek_h2': { 'zh': '杜邦纸袋', 'en': 'Tyvek Bags' },
    'products_tyvek_lead': { 'zh': 'Tyvek材质，兼具纸张与织物的特性，轻薄强韧、防水透气。', 'en': 'Tyvek combines paper and fabric traits — light, strong, waterproof, breathable.' },
    'products_tyvek_p': { 'zh': '独特的纤维纹理和手感，让每一只杜邦纸袋都充满设计感。适合高端品牌包装、文创产品、设计师合作款。', 'en': 'Unique fiber texture and feel make every Tyvek bag design-forward. Ideal for premium brands, creative products, designer collabs.' },
    'products_tyvek_scene': { 'zh': '适用场景', 'en': 'Use Cases' },
    'products_tyvek_scene1': { 'zh': '高端品牌包装袋', 'en': 'Premium brand packaging' },
    'products_tyvek_scene2': { 'zh': '文创产品、设计师品牌', 'en': 'Creative products, designer brands' },
    'products_tyvek_scene3': { 'zh': '科技展会、发布会礼品', 'en': 'Tech events, launch gifts' },
    'products_tyvek_scene4': { 'zh': '艺术展览、博物馆周边', 'en': 'Art exhibitions, museum merch' },
    'products_tyvek_craft': { 'zh': '可选工艺', 'en': 'Techniques' },
    'products_tyvek_quote': { 'zh': '咨询杜邦纸袋报价', 'en': 'Quote for Tyvek Bags' },
    'products_waterproof_h2': { 'zh': '防水袋', 'en': 'Waterproof Bags' },
    'products_waterproof_lead': { 'zh': '采用PVC、TPU等防水材质，密封性强，适合多种户外场景。', 'en': 'PVC/TPU waterproof materials with strong sealing for various outdoor scenarios.' },
    'products_waterproof_p': { 'zh': '从手机防水袋到大型装备防水包，我们提供多种规格和款式选择。可定制品牌Logo，是户外活动和水上运动的理想伴侣。', 'en': 'From phone pouches to large gear bags, multiple sizes available. Custom logo for outdoor and water sports.' },
    'products_waterproof_scene': { 'zh': '适用场景', 'en': 'Use Cases' },
    'products_waterproof_scene1': { 'zh': '游泳、漂流、潜水等水上运动', 'en': 'Swimming, rafting, diving' },
    'products_waterproof_scene2': { 'zh': '户外徒步、露营装备防护', 'en': 'Hiking, camping gear protection' },
    'products_waterproof_scene3': { 'zh': '手机、相机等电子产品防水', 'en': 'Phone, camera waterproofing' },
    'products_waterproof_scene4': { 'zh': '品牌户外推广活动', 'en': 'Brand outdoor promotions' },
    'products_waterproof_craft': { 'zh': '可选工艺', 'en': 'Techniques' },
    'products_waterproof_quote': { 'zh': '咨询防水袋报价', 'en': 'Quote for Waterproof Bags' },
    'products_price_tag': { 'zh': '参考价格', 'en': 'Reference Pricing' },
    'products_price_h2': { 'zh': '帆布袋参考报价', 'en': 'Canvas Bag Reference Prices' },
    'products_price_note': { 'zh': '以下为12安涤棉帆布双面UV印刷（正常面积）含2.5宽织带手提的参考价格，具体以实际报价为准', 'en': 'Reference prices for 12oz polyester-cotton canvas, double-sided UV print (normal area) with 2.5cm woven handles. Actual quote may vary.' },
    'products_price_caption1': { 'zh': '帆布袋参考价格表（单位：元/个）', 'en': 'Canvas Bag Price Reference (CNY/pc)' },
    'products_price_caption2': { 'zh': '帆布袋规格与克重对照表', 'en': 'Canvas Bag Size & Weight Chart' },
    'products_price_warn': { 'zh': '以上价格为参考价，实际报价根据具体工艺、数量、交期等因素确定。欢迎联系获取精准报价。', 'en': 'Prices are for reference only. Actual quote depends on technique, quantity, and lead time. Contact us for accurate pricing.' },

    // ===== Process Page =====
    'process_title': { 'zh': '定制流程 - 帆布袋无纺布袋批量定制步骤 | 袋尚工坊', 'en': 'Process - Custom Bag Ordering Steps | BagCraft Workshop' },
    'process_desc': { 'zh': '袋尚工坊定制流程：需求沟通→设计确认→打样生产→交付售后。上海市嘉定区源头工厂，支持来图来样定制，100个起订，7天快速交付。', 'en': 'BagCraft Workshop process: inquiry → design → sampling → delivery. Jiading Shanghai factory, custom designs, 100 pcs MOQ, 7-day delivery.' },
    'process_og_title': { 'zh': '定制流程 - 袋尚工坊', 'en': 'Process - BagCraft Workshop' },
    'process_og_desc': { 'zh': '四步轻松完成袋类定制：需求沟通→设计确认→打样生产→交付售后', 'en': 'Four easy steps to custom bags: inquiry → design → sampling → delivery.' },
    'process_header_tag': { 'zh': '定制流程', 'en': 'Process' },
    'process_header_h1': { 'zh': '四步轻松完成定制', 'en': 'Four Steps to Customization' },
    'process_header_p': { 'zh': '从沟通需求到交付成品，我们提供一站式高效服务，让定制变得简单', 'en': 'From inquiry to delivery, one-stop efficient service makes customization easy.' },
    'process_step1_h2': { 'zh': '需求沟通', 'en': 'Step 1: Consultation' },
    'process_step1_time': { 'zh': '预计时间：1天', 'en': 'Estimated: 1 day' },
    'process_step1_p': { 'zh': '告诉我们您的需求，我们的专业顾问将为您提供最优方案建议。您可以通过电话、微信或邮件联系我们，描述以下信息：', 'en': 'Tell us your needs and our consultants will recommend the best solution. Contact us by phone, email, or WhatsApp with the following:' },
    'process_step1_li1': { 'zh': '袋型选择：帆布袋 / 无纺布袋 / 杜邦纸袋', 'en': 'Bag type: Canvas / Non-woven / Tyvek' },
    'process_step1_li2': { 'zh': '尺寸规格：提供具体宽高尺寸或参考样品', 'en': 'Size: Provide W×H dimensions or reference sample' },
    'process_step1_li3': { 'zh': '数量需求：预计订购数量（100个起订）', 'en': 'Quantity: Estimated order quantity (100 pcs MOQ)' },
    'process_step1_li4': { 'zh': '印刷内容：Logo、图案、文字等设计稿', 'en': 'Print content: Logo, graphics, text design files' },
    'process_step1_li5': { 'zh': '特殊要求：材质、工艺、配件等定制需求', 'en': 'Special requirements: Material, technique, accessories' },
    'process_step2_h2': { 'zh': '设计确认', 'en': 'Step 2: Design Confirmation' },
    'process_step2_time': { 'zh': '预计时间：1-2天', 'en': 'Estimated: 1-2 days' },
    'process_step2_p': { 'zh': '收到您的设计稿后，我们的设计团队将为您免费排版，提供效果图确认。', 'en': 'After receiving your design, our team provides free layout and mockup for approval.' },
    'process_step2_li1': { 'zh': '免费排版设计服务', 'en': 'Free layout design service' },
    'process_step2_li2': { 'zh': '提供印刷效果图确认', 'en': 'Print mockup for confirmation' },
    'process_step2_li3': { 'zh': '支持修改调整至满意', 'en': 'Revisions until satisfied' },
    'process_step2_li4': { 'zh': '确认后签订生产合同', 'en': 'Production contract after confirmation' },
    'process_step3_h2': { 'zh': '打样生产', 'en': 'Step 3: Sampling & Production' },
    'process_step3_time': { 'zh': '预计时间：3-7天', 'en': 'Estimated: 3-7 days' },
    'process_step3_p': { 'zh': '根据确认的样品或设计稿安排生产，严格把控每一道工序。', 'en': 'Production arranged per approved sample/artwork, with strict QC at every step.' },
    'process_step3_li1': { 'zh': '支持先打样确认（打样费可抵大货款）', 'en': 'Sample first (sample fee deductible from bulk order)' },
    'process_step3_li2': { 'zh': '先进印刷设备保障色彩还原', 'en': 'Advanced printing ensures color accuracy' },
    'process_step3_li3': { 'zh': '每道工序质检，不良率低于0.5%', 'en': 'QC at every step, defect rate below 0.5%' },
    'process_step3_li4': { 'zh': '生产进度实时反馈', 'en': 'Real-time production updates' },
    'process_step4_h2': { 'zh': '交付售后', 'en': 'Step 4: Delivery & Support' },
    'process_step4_time': { 'zh': '预计时间：1-2天', 'en': 'Estimated: 1-2 days' },
    'process_step4_p': { 'zh': '成品检验合格后安排发货，支持多种物流方式。', 'en': 'Shipping arranged after final QC pass. Multiple logistics options supported.' },
    'process_step4_li1': { 'zh': '成品全检后发货', 'en': '100% final inspection before shipping' },
    'process_step4_li2': { 'zh': '支持快递、物流、自提等多种方式', 'en': 'Express, freight, self-pickup options' },
    'process_step4_li3': { 'zh': '提供售后服务保障', 'en': 'After-sales service guarantee' },
    'process_step4_li4': { 'zh': '长期合作客户享优先排产', 'en': 'Priority production for long-term partners' },
    'process_faq_tag': { 'zh': '常见问题', 'en': 'FAQ' },
    'process_faq_h2': { 'zh': '您可能还想了解', 'en': 'You May Also Wonder' },
    'process_faq_q1': { 'zh': '最低起订量是多少？', 'en': 'What is the minimum order quantity?' },
    'process_faq_a1': { 'zh': '我们支持100个起订，打破传统大批量门槛，适合初创品牌和小批量测试。', 'en': 'We support 100 pcs MOQ, breaking the traditional bulk barrier. Perfect for startups and small batch testing.' },
    'process_faq_q2': { 'zh': '可以寄样看质量吗？', 'en': 'Can I get a sample to check quality?' },
    'process_faq_a2': { 'zh': '当然可以。我们支持免费寄送现有样品，也可以按您的要求打样（打样费可抵扣大货款）。', 'en': 'Absolutely. We offer free existing samples, or custom samples (sample fee deductible from bulk order).' },
    'process_faq_q3': { 'zh': '定制周期需要多久？', 'en': 'How long does customization take?' },
    'process_faq_a3': { 'zh': '标准订单7-10天，加急订单3-5天。具体取决于数量和工艺复杂度。', 'en': 'Standard orders 7-10 days, rush orders 3-5 days. Depends on quantity and technique complexity.' },
    'process_faq_q4': { 'zh': '支持哪些印刷工艺？', 'en': 'What printing techniques do you support?' },
    'process_faq_a4': { 'zh': '丝网印刷、热转印、数码直喷、刺绣、烫金烫银等，具体根据袋型和设计推荐最优方案。', 'en': 'Screen print, heat transfer, DTG, embroidery, foil stamping, etc. We recommend the best option based on bag type and design.' },
    'process_faq_q5': { 'zh': '可以出口到国外吗？', 'en': 'Can you export overseas?' },
    'process_faq_a5': { 'zh': '可以。我们有丰富的出口经验，支持FOB、CIF等贸易条款，可协助办理出口手续。', 'en': 'Yes. We have extensive export experience, support FOB, CIF terms, and can assist with export procedures.' },
    'process_faq_q6': { 'zh': '如何确保产品质量？', 'en': 'How do you ensure product quality?' },
    'process_faq_a6': { 'zh': '从原材料检验、生产过程巡检到成品全检，三道质检环节确保品质。不良率控制在0.5%以下。', 'en': 'Three-stage QC: raw material inspection, in-process checks, and final inspection. Defect rate controlled below 0.5%.' },
    'process_cta_h2': { 'zh': '还有疑问？立即联系我们', 'en': 'Still Have Questions? Contact Us' },
    'process_cta_p': { 'zh': '专业顾问一对一解答，获取免费报价和方案建议', 'en': 'One-on-one consultation, free quote and solution advice.' },
    'process_cta_btn': { 'zh': '立即咨询', 'en': 'Get in Touch' },

    // ===== About Page =====
    'about_title': { 'zh': '关于我们 - 上海袋类定制源头工厂 | 袋尚工坊', 'en': 'About Us - Custom Bag Factory Shanghai | BagCraft Workshop' },
    'about_desc': { 'zh': '袋尚工坊位于上海市嘉定区，12年专注袋类定制生产。了解我们的工厂实力、生产设备和品质理念。', 'en': 'BagCraft Workshop in Jiading, Shanghai. 12 years of bag customization. Learn about our factory, equipment, and quality philosophy.' },
    'about_og_title': { 'zh': '关于我们 - 袋尚工坊', 'en': 'About Us - BagCraft Workshop' },
    'about_og_desc': { 'zh': '上海市嘉定区专业袋类定制源头工厂，12年行业经验', 'en': 'Professional custom bag factory in Jiading, Shanghai. 12 years of industry experience.' },
    'about_header_tag': { 'zh': '关于我们', 'en': 'About Us' },
    'about_header_h1': { 'zh': '专注袋类定制12年', 'en': '12 Years in Bag Customization' },
    'about_header_p': { 'zh': '上海市嘉定区源头工厂，以专业工艺和优质服务赢得客户信赖', 'en': 'Jiading, Shanghai factory. Trusted for professional craftsmanship and quality service.' },
    'about_intro_h2': { 'zh': '工厂简介', 'en': 'Factory Profile' },
    'about_intro_p1': { 'zh': '袋尚工坊坐落于上海市嘉定区，是一家专注于袋类定制生产的源头工厂。自创立以来，我们始终秉承"品质为先、客户至上"的经营理念，为超过5000家企业客户提供优质的袋类定制服务。', 'en': 'BagCraft Workshop is located in Jiading, Shanghai, specializing in custom bag manufacturing. Since inception, we have upheld "quality first, customer supreme" to serve 5000+ business clients.' },
    'about_intro_p2': { 'zh': '工厂拥有完整的生产线，从面料采购、裁剪、印刷到缝纫、质检、包装，每一道工序都严格把控。我们引进先进的印刷设备和缝纫设备，确保产品品质稳定、交期准时。', 'en': 'Our factory has a complete production line from fabric sourcing, cutting, printing to sewing, QC, and packaging. Every step is strictly controlled with advanced equipment ensuring stable quality and on-time delivery.' },
    'about_intro_li1': { 'zh': '自有生产基地，全程品质把控', 'en': 'Own production base with full quality control' },
    'about_intro_li2': { 'zh': '先进生产设备，保障产能与品质', 'en': 'Advanced equipment for capacity and quality' },
    'about_intro_li3': { 'zh': '经验丰富的技术团队', 'en': 'Experienced technical team' },
    'about_intro_li4': { 'zh': '完善的质检体系，不良率低于0.5%', 'en': 'Complete QC system, defect rate below 0.5%' },
    'about_video_tag': { 'zh': '工厂实拍', 'en': 'Factory Tour' },
    'about_video_h2': { 'zh': '走进我们的生产车间', 'en': 'Inside Our Production Floor' },
    'about_video_p': { 'zh': '真实的工厂环境，专业的生产设备，严谨的质量管控', 'en': 'Real factory environment, professional equipment, strict quality control.' },
    'about_video_cut': { 'zh': '裁剪工序', 'en': 'Cutting' },
    'about_video_sew': { 'zh': '缝纫制作', 'en': 'Sewing' },
    'about_video_print': { 'zh': '印刷工艺', 'en': 'Printing' },
    'about_video_qc': { 'zh': '质检包装', 'en': 'QC & Packaging' },
    'about_video_show': { 'zh': '成品展示', 'en': 'Finished Products' },
    'about_video_ship': { 'zh': '发货物流', 'en': 'Shipping' },
    'about_craft_tag': { 'zh': '工艺能力', 'en': 'Capabilities' },
    'about_craft_h2': { 'zh': '我们的工艺与设备', 'en': 'Our Techniques & Equipment' },
    'about_craft_p': { 'zh': '多种印刷工艺和先进的生产设备，满足不同客户的定制需求', 'en': 'Multiple printing techniques and advanced equipment to meet diverse customization needs.' },
    'about_craft_screen': { 'zh': '丝网印刷', 'en': 'Screen Printing' },
    'about_craft_screen_desc': { 'zh': '色彩饱满，适合大面积单色或套色印刷，性价比高', 'en': 'Vibrant colors, ideal for large-area single or multi-color prints. Great value.' },
    'about_craft_heat': { 'zh': '热转印', 'en': 'Heat Transfer' },
    'about_craft_heat_desc': { 'zh': '图案精细，色彩还原度高，适合复杂图案和照片级印刷', 'en': 'Fine detail, high color accuracy. Ideal for complex patterns and photo-quality prints.' },
    'about_craft_dtg': { 'zh': '数码直喷', 'en': 'DTG Printing' },
    'about_craft_dtg_desc': { 'zh': '无需制版，支持小批量多图案，灵活高效', 'en': 'No plate needed. Supports small batch, multi-pattern orders. Flexible and efficient.' },
    'about_craft_emb': { 'zh': '刺绣工艺', 'en': 'Embroidery' },
    'about_craft_emb_desc': { 'zh': '立体感强，质感高级，适合高端品牌Logo呈现', 'en': 'Strong 3D effect, premium feel. Ideal for high-end brand logos.' },
    'about_craft_foil': { 'zh': '烫金烫银', 'en': 'Foil Stamping' },
    'about_craft_foil_desc': { 'zh': '金属光泽，奢华质感，提升产品档次', 'en': 'Metallic sheen, luxurious feel. Elevates product quality.' },
    'about_stats_tag': { 'zh': '企业数据', 'en': 'Company Data' },
    'about_stats_h2': { 'zh': '用数据说话', 'en': 'By the Numbers' },
    'about_stats_p': { 'zh': '多年的积累，让我们有能力服务更多客户', 'en': 'Years of accumulation enable us to serve more clients.' },
    'about_stat_years': { 'zh': '年行业经验', 'en': 'Years Experience' },
    'about_stat_clients': { 'zh': '合作客户', 'en': 'Clients Served' },
    'about_stat_output': { 'zh': '年产量（只）', 'en': 'Annual Output (pcs)' },
    'about_stat_defect': { 'zh': '不良率控制', 'en': 'Defect Rate' },
    'about_stat_staff': { 'zh': '生产员工', 'en': 'Production Staff' },
    'about_stat_area': { 'zh': '厂房面积（㎡）', 'en': 'Factory Area (㎡)' },
    'about_cta_h2': { 'zh': '期待与您的合作', 'en': 'Looking Forward to Working with You' },
    'about_cta_p': { 'zh': '无论您是初创品牌还是大型企业，我们都能为您提供专业的袋类定制解决方案', 'en': 'Whether you are a startup or large enterprise, we provide professional custom bag solutions.' },
    'about_cta_btn': { 'zh': '联系我们', 'en': 'Contact Us' },

    // ===== Contact Page =====
    'contact_title': { 'zh': '联系我们 - 袋类定制报价咨询 | 袋尚工坊 上海嘉定区', 'en': 'Contact Us - Custom Bag Quote | BagCraft Workshop Jiading Shanghai' },
    'contact_desc': { 'zh': '联系袋尚工坊获取免费报价。上海市嘉定区源头工厂，专业定制帆布袋、无纺布袋、杜邦纸袋。电话+86 18668121065，100个起订。', 'en': 'Contact BagCraft Workshop for a free quote. Jiading Shanghai factory. Custom canvas, non-woven & Tyvek bags. Tel: +86-18668121065. 100 pcs MOQ.' },
    'contact_og_title': { 'zh': '联系我们 - 袋尚工坊', 'en': 'Contact Us - BagCraft Workshop' },
    'contact_og_desc': { 'zh': '获取免费报价，上海市嘉定区袋类定制源头工厂', 'en': 'Free quote from Jiading Shanghai custom bag factory.' },
    'contact_header_tag': { 'zh': '联系我们', 'en': 'Contact Us' },
    'contact_header_h1': { 'zh': '获取免费报价', 'en': 'Get a Free Quote' },
    'contact_header_p': { 'zh': '告诉我们您的需求，我们将在24小时内回复您', 'en': 'Tell us your needs and we will reply within 24 hours.' },
    'contact_info_h2': { 'zh': '联系方式', 'en': 'Contact Information' },
    'contact_info_phone': { 'zh': '电话咨询', 'en': 'Phone' },
    'contact_info_whatsapp': { 'zh': 'WhatsApp', 'en': 'WhatsApp' },
    'contact_info_email': { 'zh': '邮件咨询', 'en': 'Email' },
    'contact_info_addr': { 'zh': '工厂地址', 'en': 'Factory Address' },
    'contact_info_hours': { 'zh': '工作时间', 'en': 'Business Hours' },
    'contact_addr_val': { 'zh': '上海市嘉定区', 'en': 'Jiading District, Shanghai, China' },
    'contact_form_h2': { 'zh': '在线留言', 'en': 'Send a Message' },
    'contact_form_name': { 'zh': '您的称呼', 'en': 'Your Name' },
    'contact_form_name_ph': { 'zh': '请输入您的称呼', 'en': 'Enter your name' },
    'contact_form_email': { 'zh': '电子邮箱', 'en': 'Email' },
    'contact_form_email_ph': { 'zh': 'your@email.com', 'en': 'your@email.com' },
    'contact_form_phone': { 'zh': '联系电话', 'en': 'Phone' },
    'contact_form_phone_ph': { 'zh': '您的联系电话', 'en': 'Your phone number' },
    'contact_form_product': { 'zh': '咨询产品', 'en': 'Product Interest' },
    'contact_form_product_ph': { 'zh': '请选择产品类型', 'en': 'Select product type' },
    'contact_form_qty': { 'zh': '预计数量', 'en': 'Quantity' },
    'contact_form_qty_ph': { 'zh': '如：500个', 'en': 'e.g. 500 pcs' },
    'contact_form_message': { 'zh': '需求描述', 'en': 'Message' },
    'contact_form_message_ph': { 'zh': '请详细描述您的需求...', 'en': 'Describe your requirements in detail...' },
    'contact_form_submit': { 'zh': '提交咨询', 'en': 'Submit Inquiry' },
    'contact_why_tag': { 'zh': '选择我们的理由', 'en': 'Why Choose Us' },
    'contact_why_h2': { 'zh': '为什么选择袋尚工坊', 'en': 'Why BagCraft Workshop' },
    'contact_why_p': { 'zh': '源头工厂直供，品质与价格双重保障', 'en': 'Factory direct — quality and price guaranteed.' },
    'contact_why_1': { 'zh': '12年行业经验，服务5000+客户', 'en': '12 years experience, 5000+ clients served' },
    'contact_why_2': { 'zh': '100个起订，小批量友好', 'en': '100 pcs MOQ, small batch friendly' },
    'contact_why_3': { 'zh': '7天快速交付，支持加急', 'en': '7-day delivery, rush orders accepted' },
    'contact_why_4': { 'zh': '多种工艺可选，满足各种设计', 'en': 'Multiple techniques for any design' },
    'contact_why_5': { 'zh': '免费排版设计，效果图确认', 'en': 'Free layout design with mockup approval' },
    'contact_why_6': { 'zh': '出口经验丰富，支持外贸订单', 'en': 'Export experience, foreign trade orders welcome' },
  };

  // ===================== Language Engine =====================
  const I18N = {
    currentLang: 'zh',
    fallbackLang: 'zh',

    // Detect language from IP (using Cloudflare headers when available)
    detectFromIP() {
      // Cloudflare passes country code in request headers
      // On client side, we can use navigator.language as fallback
      const browserLang = navigator.language || navigator.userLanguage || '';
      if (browserLang.toLowerCase().startsWith('zh')) return 'zh';
      return 'en';
    },

    // Get saved language from localStorage
    getSavedLang() {
      try {
        return localStorage.getItem('bagfactory_lang');
      } catch (e) {
        return null;
      }
    },

    // Save language to localStorage
    saveLang(lang) {
      try {
        localStorage.setItem('bagfactory_lang', lang);
      } catch (e) {
        // ignore
      }
    },

    // Initialize language
    init() {
      const saved = this.getSavedLang();
      if (saved && (saved === 'zh' || saved === 'en')) {
        this.currentLang = saved;
      } else {
        this.currentLang = this.detectFromIP();
        this.saveLang(this.currentLang);
      }
      this.apply();
      this.updateLangSwitcher();
      this.updateMeta();
    },

    // Switch language
    switch(lang) {
      if (lang !== 'zh' && lang !== 'en') return;
      this.currentLang = lang;
      this.saveLang(lang);
      this.apply();
      this.updateLangSwitcher();
      this.updateMeta();
      // Update html lang attribute
      document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    },

    // Get translation
    t(key) {
      const trans = TRANSLATIONS[key];
      if (!trans) return key;
      return trans[this.currentLang] || trans[this.fallbackLang] || key;
    },

    // Apply translations to all elements with data-i18n
    apply() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = this.t(key);
        if (el.tagName === 'TITLE') {
          document.title = text;
        } else if (el.tagName === 'META') {
          el.setAttribute('content', text);
        } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else if (el.tagName === 'OPTION') {
          el.textContent = text;
        } else {
          el.innerHTML = text;
        }
      });

      // Update placeholders via data-i18n-placeholder
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = this.t(key);
      });

      // Update aria-labels
      document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        el.setAttribute('aria-label', this.t(key));
      });
    },

    // Update language switcher UI
    updateLangSwitcher() {
      const switcher = document.querySelector('.lang-switcher');
      if (!switcher) return;
      switcher.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
      });
      const currentLabel = switcher.querySelector('.lang-current');
      if (currentLabel) {
        currentLabel.textContent = this.currentLang === 'zh' ? '中文' : 'EN';
      }
    },

    // Update page meta (title, description)
    updateMeta() {
      // Title is handled by data-i18n on title tag
      // Description is handled by data-i18n on meta[name="description"]
      // OG tags are handled similarly
    }
  };

  // ===================== Inject Language Switcher =====================
  function injectLangSwitcher() {
    const nav = document.querySelector('.navbar-inner');
    if (!nav || nav.querySelector('.lang-switcher')) return;

    const switcherHTML = `
      <div class="lang-switcher" role="group" aria-label="语言切换">
        <button class="lang-btn active" data-lang="zh" type="button" aria-pressed="true">中</button>
        <button class="lang-btn" data-lang="en" type="button" aria-pressed="false">EN</button>
      </div>
    `;

    // Insert before mobile menu button
    const mobileBtn = nav.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
      mobileBtn.insertAdjacentHTML('beforebegin', switcherHTML);
    } else {
      nav.insertAdjacentHTML('beforeend', switcherHTML);
    }

    // Bind click events
    nav.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        I18N.switch(lang);
      });
    });
  }

  // ===================== Initialize =====================
  function init() {
    injectLangSwitcher();
    I18N.init();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose to global for debugging
  window.I18N = I18N;
})();
