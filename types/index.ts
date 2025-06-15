export interface Post {
    /** ユニークID（例: Date.now().toString()） */
    id: string
  
    /** 選択日時（YYYY-MM-DD形式） */
    date: string
  
    /** 投稿内容 */
    content: string
  
    /** 画像URIの配列（最大4枚） */
    photos: string[]
  
    /** 逆ジオコーディングで得られた住所 */
    address?: string
  
    /** 緯度・経度情報。取得に失敗する可能性があるためnull許容 */
    coords?: {
      latitude: number
      longitude: number
    }
  }