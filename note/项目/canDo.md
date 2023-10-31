## 1、表格封装


```tsx
import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';

// 二次封装
export const MyTable = <RecordType extends object = any>(props: TableProps<RecordType>) => {
  const { ...allProps } = props;
  return (
    <Table<RecordType>
      {...allProps}
    />
  );
};
```

[插件机制](https://github.com/sl1673495/blogs/issues/78)

[useAntdTable](https://github.com/alibaba/hooks/tree/master/packages/hooks/src/useAntdTable)

[usePagination](https://github.com/ant-design/ant-design/blob/master/components/table/hooks/usePagination.ts)

https://juejin.cn/post/6844904017492082702

https://juejin.cn/post/7230366377705586748

## 2、LCP优化

取消动画

```css
.ant-checkbox-checked .ant-checkbox-inner::after {
    transition: none;
}

.ant-checkbox-checked::after { 
    animation: none;
}
```

https://zhuanlan.zhihu.com/p/365275880

https://legacy.reactjs.org/docs/optimizing-performance.html

https://heapdump.cn/article/3587314

https://judes.me/frontend/2019/09/17/infinite-table.html

https://github.com/wubostc/virtualized-table-for-antd/issues

https://juejin.cn/post/7063332320339099678

https://github.com/ant-design/ant-design/issues/35241

https://epicreact.dev/modules/react-performance/react-performance-welcome

https://www.smashingmagazine.com/2020/07/methods-performance-react-apps/

https://blog.devgenius.io/ant-design-component-customization-and-bundle-optimization-a1fa3253a175

https://ant-design.antgroup.com/docs/blog/virtual-table-cn

https://www.toptal.com/react/optimizing-react-performance

https://zhuanlan.zhihu.com/p/48140299

https://zhuanlan.zhihu.com/p/136665404

## 3、react

[**Create React App**](https://create-react-app.dev/) 介绍创建到发布reactApp的流程

[Create Serverless React.js Apps](http://serverless-stack.com/)

[Clone Medium on Node.js and React.js](https://kris101.medium.com/clone-medium-on-node-js-and-react-js-731cdfbb6878)

[How to use Webpack with React: an in-depth tutorial](https://www.freecodecamp.org/news/learn-webpack-for-react-a36d4cac5060)

[How to build your own React boilerplate](https://www.freecodecamp.org/news/how-to-build-your-own-react-boilerplate-2f8cbbeb9b3f)

[Build A Chat App With Sentiment Analysis Using Next.js](https://codeburst.io/build-a-chat-app-with-sentiment-analysis-using-next-js-c43ebf3ea643)

[Build an Appointment Scheduler Using React, Twilio and Cosmic JS](https://hackernoon.com/build-an-appointment-scheduler-using-react-twilio-and-cosmic-js-95377f6d1040)

## 4、UI/UX

[UI / UX Design 专项课程](https://www.coursera.org/specializations/ui-ux-design?utm_source=gg&utm_medium=sem&utm_campaign=34-UI-UX-Design-US&utm_content=34-UI-UX-Design-US&campaignid=12471995734&adgroupid=119387383195&device=c&keyword=ux%20design%20course%20online&matchtype=b&network=g&devicemodel=&adpostion=&creativeid=502676126357&hide_mobile_promo&gclid=Cj0KCQjw5PGFBhC2ARIsAIFIMNeM4c4_BbPo7y9RXEo1Q9eIzs-wklg_9V7TzTich-K5atWWRUUr414aAjTKEALw_wcB)

[下载地址](https://cowtransfer.com/s/6d142bc45a5d46) 提取码：823602

1. Visual Elements of User Interface Design
2. UX Design Fundamentals
3. Web Design: Strategy and Information Architecture
4. Web Design: Wireframes to Prototypes

课程一二重理论，课程三四以大项目为主干，大项目是设计一个外卖餐馆的网站。

如果你是其他领域转UX，不知道从何入手，这里有一些在线课程可以看看：

https://www.linkedin.com/learning/paths/become-a-user-experience-designer

https://www.invisionapp.com/ecourses/principles-of-ux-design

https://www.figma.com/resources/learn-design/

https://www.coursera.org/learn/user-experience-design

https://www.udacity.com/course/product-design--ud509

## 5、webGL

<img src="../assets/image-20231031162139328.png" alt="image-20231031162139328" style="zoom:50%;" />
