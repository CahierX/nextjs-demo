#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function verifyMetadata(url) {
  console.log(`🔍 正在分析: ${url}\n`);
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // 提取元数据
    const metadata = await page.evaluate(() => {
      const metas = {};
      
      // 提取 title
      metas.title = document.title;
      
      // 提取所有 meta 标签
      document.querySelectorAll('meta').forEach(meta => {
        const name = meta.getAttribute('name') || meta.getAttribute('property');
        const content = meta.getAttribute('content');
        if (name && content) {
          metas[name] = content;
        }
      });
      
      // 提取 link 标签
      metas.links = [];
      document.querySelectorAll('link[rel]').forEach(link => {
        metas.links.push({
          rel: link.getAttribute('rel'),
          href: link.getAttribute('href'),
          type: link.getAttribute('type'),
          sizes: link.getAttribute('sizes')
        });
      });
      
      return metas;
    });
    
    // 验证结果
    const validation = validateMetadata(metadata);
    
    // 输出结果
    console.log('📊 元数据验证结果:');
    console.log('=====================================');
    
    if (validation.errors.length === 0) {
      console.log('✅ 所有关键元数据配置正确！');
    } else {
      console.log(`❌ 发现 ${validation.errors.length} 个问题:`);
      validation.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }
    
    console.log('\n📋 元数据详情:');
    console.log('=====================================');
    
    // 基本信息
    console.log(`标题: ${metadata.title || '未设置'}`);
    console.log(`描述: ${metadata.description || '未设置'}`);
    console.log(`关键词: ${metadata.keywords || '未设置'}`);
    
    // Open Graph
    console.log('\n🌐 Open Graph:');
    console.log(`og:title: ${metadata['og:title'] || '未设置'}`);
    console.log(`og:description: ${metadata['og:description'] || '未设置'}`);
    console.log(`og:image: ${metadata['og:image'] || '未设置'}`);
    console.log(`og:url: ${metadata['og:url'] || '未设置'}`);
    console.log(`og:type: ${metadata['og:type'] || '未设置'}`);
    
    // Twitter Cards
    console.log('\n🐦 Twitter Cards:');
    console.log(`twitter:card: ${metadata['twitter:card'] || '未设置'}`);
    console.log(`twitter:title: ${metadata['twitter:title'] || '未设置'}`);
    console.log(`twitter:description: ${metadata['twitter:description'] || '未设置'}`);
    console.log(`twitter:image: ${metadata['twitter:images'] || '未设置'}`);
    
    // 图标
    console.log('\n🔗 图标和链接:');
    if (metadata.links && metadata.links.length > 0) {
      metadata.links.forEach(link => {
        if (link.rel && link.href) {
          console.log(`${link.rel}: ${link.href}`);
        }
      });
    } else {
      console.log('未找到图标链接');
    }
    
    // 保存详细报告
    const report = {
      url,
      timestamp: new Date().toISOString(),
      metadata,
      validation,
      recommendations: getRecommendations(metadata)
    };
    
    const reportPath = path.join(process.cwd(), 'metadata-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 详细报告已保存至: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ 分析失败:', error.message);
  } finally {
    await browser.close();
  }
}

function validateMetadata(metadata) {
  const errors = [];
  const warnings = [];
  
  // 检查标题
  if (!metadata.title) {
    errors.push('缺少页面标题');
  } else if (metadata.title.length > 60) {
    warnings.push('标题过长（建议不超过60字符）');
  } else if (metadata.title.length < 10) {
    warnings.push('标题过短（建议至少10字符）');
  }
  
  // 检查描述
  if (!metadata.description) {
    errors.push('缺少页面描述');
  } else if (metadata.description.length > 160) {
    warnings.push('描述过长（建议不超过160字符）');
  } else if (metadata.description.length < 50) {
    warnings.push('描述过短（建议至少50字符）');
  }
  
  // 检查 Open Graph
  if (!metadata['og:title']) {
    errors.push('缺少 og:title');
  }
  if (!metadata['og:description']) {
    errors.push('缺少 og:description');
  }
  if (!metadata['og:image']) {
    errors.push('缺少 og:image');
  }
  if (!metadata['og:url']) {
    warnings.push('建议设置 og:url');
  }
  
  // 检查 Twitter Cards
  if (!metadata['twitter:card']) {
    errors.push('缺少 twitter:card');
  }
  
  // 检查图标
  const hasIcon = metadata.links && metadata.links.some(link => 
    link.rel && (link.rel.includes('icon') || link.rel.includes('apple'))
  );
  if (!hasIcon) {
    warnings.push('建议添加网站图标');
  }
  
  return { errors, warnings };
}

function getRecommendations(metadata) {
  const recommendations = [];
  
  // 标题优化建议
  if (metadata.title && metadata.title.length > 50) {
    recommendations.push({
      type: 'SEO',
      message: '考虑缩短标题长度以提高搜索引擎显示效果'
    });
  }
  
  // 描述优化建议
  if (metadata.description && metadata.description.length < 120) {
    recommendations.push({
      type: 'SEO',
      message: '可以适当增加描述长度，充分利用160字符限制'
    });
  }
  
  // Open Graph 建议
  if (!metadata['og:type']) {
    recommendations.push({
      type: 'Social',
      message: '建议设置 og:type 以优化社交媒体分享效果'
    });
  }
  
  // 结构化数据建议
  recommendations.push({
    type: 'Advanced',
    message: '考虑添加JSON-LD结构化数据以提高搜索引擎理解'
  });
  
  return recommendations;
}

// 命令行参数处理
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('使用方法: node verify-metadata.js <URL>');
  console.log('示例: node verify-metadata.js http://localhost:3000/metadata-demo');
  process.exit(1);
}

const url = args[0];
verifyMetadata(url).catch(console.error);
