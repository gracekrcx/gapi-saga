串接 YouTube Data API v3 search
-

### 使用技術
- redux-saga  
輸入關鍵字後自動打 search api 並用 redux-saga 去做 throttle

- Intersection Observer  
嘗試用 intersection Observer 去執行 infinite scroll

### 操作說明
1. 輸入關鍵字例如：'wolf' 之後 delay(1000) 打一次 search api 
2. 如果有需要，按 Enter 會再拿 query 去打一次 search api
3. 滾動到畫面最下方，會 auto fetch 新的資料

### 錯誤處理
1. 輸入: 'audibebexxoo', response 是空 array 時，畫面顯示錯誤提示：沒有相符的影片
2. 輸入: 'kokokokookoo', response 沒有 nextPageToken 就不會 auto fetch，畫面會顯示沒有更多資料

### 踩坑
1. 使用 Intersection Observer 需要給 ref 固定的高，以我的例子，我沒有給放影片的 div 固定的高，所以在 initial render 時，entry.isIntersecting 會先顯示 true 瞬間又顯示 false，一個東西不可能又 true 又 false，所以很明顯就是進去判斷式兩次，總之給了 div 固定高之後，就解決了 
2. 寫 propTypes 對之後的維護有加分的作用，建議要寫。



