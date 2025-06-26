import { NextRequest, NextResponse } from 'next/server';
import { DatabaseHelper } from '@/lib/database';

// GET /api/products - 获取产品列表
export async function GET() {
  try {
    const products = await DatabaseHelper.getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('获取产品失败:', error);
    return NextResponse.json(
      { error: '获取产品失败' },
      { status: 500 }
    );
  }
}

// POST /api/products - 创建新产品
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    
    // 数据验证
    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { error: '产品名称和价格为必填项' },
        { status: 400 }
      );
    }

    const productId = await DatabaseHelper.createProduct({
      name: productData.name,
      description: productData.description || '',
      price: Number(productData.price),
      stock: Number(productData.stock) || 0,
      category: productData.category || '未分类',
      image_url: productData.image_url || '',
    });

    // 记录分析事件
    await DatabaseHelper.createAnalyticsEvent({
      event_type: 'product_created',
      event_data: JSON.stringify({ 
        product_id: productId,
        product_name: productData.name 
      }),
    });

    return NextResponse.json(
      { id: productId, message: '产品创建成功' },
      { status: 201 }
    );
  } catch (error) {
    console.error('创建产品失败:', error);
    return NextResponse.json(
      { error: '创建产品失败' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - 更新产品
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) {
      return NextResponse.json(
        { error: '产品ID为必填项' },
        { status: 400 }
      );
    }

    const productData = await request.json();
    
    await DatabaseHelper.updateProduct(Number(id), productData);

    // 记录分析事件
    await DatabaseHelper.createAnalyticsEvent({
      event_type: 'product_updated',
      event_data: JSON.stringify({ 
        product_id: id,
        updated_fields: Object.keys(productData)
      }),
    });

    return NextResponse.json({ message: '产品更新成功' });
  } catch (error) {
    console.error('更新产品失败:', error);
    return NextResponse.json(
      { error: '更新产品失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - 删除产品
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) {
      return NextResponse.json(
        { error: '产品ID为必填项' },
        { status: 400 }
      );
    }

    await DatabaseHelper.deleteProduct(Number(id));

    // 记录分析事件
    await DatabaseHelper.createAnalyticsEvent({
      event_type: 'product_deleted',
      event_data: JSON.stringify({ product_id: id }),
    });

    return NextResponse.json({ message: '产品删除成功' });
  } catch (error) {
    console.error('删除产品失败:', error);
    return NextResponse.json(
      { error: '删除产品失败' },
      { status: 500 }
    );
  }
}
