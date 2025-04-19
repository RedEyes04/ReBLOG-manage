//回复内容
export type ReplyData = {
  id: number;
  article?: {
    id: number;
    title: string;
  };
  user_id: string;
  user_name: string;
  content: string;//内容
  moment: string;//时间
  complaint?: number;//举报数
  isread: number;
};

//分组 
export interface SubsetData {
  id: number | string
  name: string | number
  value: number
  moment?: string;
}

//标签 
export interface LabelData {
  id: number | string
  label_name: string | number
  moment?: Date;
}

//文件
export interface FileData {
  id: number;
  url: string;//地址路径
  fileName: string;//文件名
  format: string;//格式
  subsetId?: number; //所属类型
  selected?: boolean;//是否选择
}

//文章
export interface ArticleDate {
  id: number;
  title: string;
  subset_id?: number;
  moment: Date;//时间
  label?: string[];
  introduce?: string;//简介 
  cover?: string;//封面地址
  views: number;//查看次数
  state: number;//状态0未发布、1已发布
  comment: number;
  praise: number;//点赞次数
  content?: string
}

//日记1

export interface DiaryDate {
  id?: number;
  title?: string;
  moment?: Date;
  weather_id?: number;
  content?: string;
  picture?: string;
}

export interface FormData {
  title?: string,
  subset_id?: number,
  label?: string[],
  introduce?: string,
  cover?: string,
  classify?: number,
}