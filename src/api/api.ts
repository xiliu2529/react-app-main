// api.ts
// APIレスポンスの型定義
export interface ApiResponse<T> {
  data: T; // レスポンスデータ
  status: number; // ステータスコード
}

// APIエラーの型定義
export interface ApiError {
  message: string; // エラーメッセージ
  status: number; // ステータスコード
}

// APIリクエストを行う関数
export async function apiRequest<T>(
  url: string, // リクエストするURL
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', // HTTPメソッド
  body?: any, // リクエストボディ（任意）
  headers?: HeadersInit // リクエストヘッダー（任意）
): Promise<ApiResponse<T> | ApiError> { // 成功時は ApiResponse<T> を、失敗時は ApiError を返す
  try {
    // fetch を使用してリクエストを送信
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json', // デフォルトのコンテンツタイプ
        ...headers, // 任意のヘッダー
      },
      body: body ? JSON.stringify(body) : undefined, // ボディが存在する場合は JSON 形式に変換
    });

    if (!response.ok) {
      // レスポンスが成功でない場合、エラーメッセージを取得
      const errorText = await response.text();
      return { message: errorText, status: response.status };
    }

    // レスポンスのデータを JSON 形式で取得
    const data: T = await response.json();
    return { data, status: response.status };
  } catch (error) {
    // エラーが発生した場合、エラーメッセージとステータスコードを返す
    return {
      message: (error as Error).message,
      status: 500, // サーバーエラー
    };
  }
}
