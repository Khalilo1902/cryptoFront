export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  bio: string;
  profile_photo: string;
  canAnalyze: boolean;
  isBlocked: boolean;
  score: string;
  isAdmin: boolean;
  isFollowing: boolean;
  isAccountVerified: boolean;
  refresh_token: string;
  viewedBy: string[];
  followers: [];
  following: [];
  token: string;
  targetUserId: string;
  correctAnswers: number;
  incorrectAnswers: number;
  totalScore: number;
  verificationCode: string;
  newPassword: string;
  confirmPassword: string;
  planJournal: string;
  priceJournal: string;
  expJournal: Date;
  iatJournal: Date;
  isPaid: boolean;
}

export type TUser = Partial<IUser>;

export interface ICoin {
  _id: string;
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_date: number;
  atl_change_percentage: Date;
  roi: object;
  last_updated: Date;
  sparkline_in_7d: {
    price: number[];
  };
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

export type TCoin = Partial<ICoin>;

export interface IUserInfo {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  isAdmin: boolean;
  bio: string;
  iat: number;
  exp: number;
}

export interface IPost {
  _id: string;
  title: string;
  description: string;
  isLiked: boolean;
  isDisliked: boolean;
  numViews: number;
  likes: [];
  disLikes: [];
  user: string;
  post: string;
  image: File;
  createdAt: string;
  updatedAt: string;
  file: FormData;
  targetUser: string;
  postIdPublic: string;
  comment: string;
}

export type TPost = Partial<IPost>;

export interface IComment {
  _id: string;
  likes: [];
  disLikes: [];
  user: TUser;
  post: string;
  createdAt: string;
  updatedAt: string;
  postIdPublic: string;
  comment: string;
  commentIdPublic: string;
  targetUser: string;
}

export interface IQuiz {
  _id: string;
  type: string;
  question: string;
  choices: string;
  correct_answers: string;
  score: number;
}

export type TComment = Partial<IComment>;

export interface IJournal {
  _id: string;
  user: string;
  baseCoin: string;
  quoteCoin: string;
  tradeType: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  price: number;
  takeProfit: number;
  stopLoss: number;
  riskReward: number;
  reasonsforEntry: string;
  isClose: boolean;
  tradeSummary: string;
  results: boolean;
  profit: number;
  loss: number;
  userId: string;
  journalId:string
}

export type TJournal = Partial<IJournal>;
