import { useState, useEffect } from 'react';
import Giscus from '@giscus/react';

export default function CommentsList({ issueNumber, comments, setComments }) {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div className="comment-card"><p>加载评论中...</p></div>;
  }

  // if (!comments || !Array.isArray(comments) || comments.length === 0) {
  //   return <div className="comment-card"><p>暂无评论，快来发表第一个评论。</p></div>;
  // }

  // return (
  //   <div id="commentsList">
  //     {comments.map(comment => (
  //       <div key={comment.id} className="comment-card">
  //         <header>
  //           <span>{comment.user.login}</span>
  //           <span>{new Date(comment.created_at).toLocaleDateString('zh-CN')}</span>
  //         </header>
  //         <p>{comment.body.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />')}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
  return <Giscus
      id="comments"
      repo="newset/rag"
      repoId="MDEwOlJlcG9zaXRvcnkzOTEzMTMwMjA="
      category="Announcements"
      categoryId="DIC_kwDOF1L2fM4B-hVS"
      mapping="specific"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="catppuccin_latte"
      lang="zh-CN"
      loading="lazy"
    />
}