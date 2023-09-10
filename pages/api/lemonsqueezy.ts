// pages/api/lemonsqueezy.ts

import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('tttttest')

  if (req.method === 'POST') {
    const eventData = req.body
    console.log('Received data:', eventData) // 打印接收到的数据
    // const secret = 'SIGNING_SECRET';
    // try {
    //     verifySignature(req, secret);
    //     console.log('签名验证成功');  // 新增的日志
    //     // res.status(200).json({ message: '验证成功' });
    // } catch (error:any) {
    //     console.error('签名验证失败:', error.message);  // 新增的日志
    //     res.status(400).json({ message: '签名无效' });
    // }

    // 处理 order_created 事件
    if (eventData.meta.event_name === 'order_created') {
      console.log('Processing order_created event')
      // console.log(eventData)
      const user_email = eventData.data.attributes.user_email
      console.log('User email:', user_email)
      // 业务逻辑
      const { data: existingUser, error: existingUserError } = await supabase
        .from('UserInfo')
        .select('user_email, LeftCount') // 添加 LeftCount 到查询中
        .eq('user_email', user_email)

      if (existingUserError) {
        console.error('Error fetching user: ', existingUserError)
        return
      } else {
        console.log('update before existingUser: ', existingUser)
      }
      try {
        // 更新 Supabase 中的 UserInfo 表
        const updatedLeftCount = existingUser[0].LeftCount + 100
        console.log('updatedLeftCount', updatedLeftCount)

        const { data: updateData, error: updateError } = await supabase
          .from('UserInfo')
          .update({
            LeftCount: updatedLeftCount,
            FreeOrPaid: 1,
            paid_at: eventData.data.attributes.created_at,
          })
          .eq('user_email', user_email)

        if (updateError) {
          console.error('Error updating LeftCount: ', updateError)
        } else {
          console.log('LeftCount updated: ', updateData)
        }

        res.status(200).send({ status: 'Received and processed' })
      } catch (err: any) {
        console.error('Error:', err.message) // 打印错误
        res.status(500).send({ error: 'Failed to update Supabase', details: err.message })
      }
    } else {
      res.status(400).send({ error: 'Unhandled event' })
    }
  } else {
    res.status(405).send({ error: 'Method not allowed' })
  }
}

// function verifySignature(req: NextApiRequest, secret: string): void {
//     const payload = req.body;
//     const signature = req.headers['x-signature'] || '';

//     const hash = crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');
//     console.log('计算得到的hash:', hash);  // 新增的日志
//     console.log('请求中的signature:', signature);  // 新增的日志

//     if (hash !== signature) {
//         throw new Error('签名无效。');
//     }
// }
