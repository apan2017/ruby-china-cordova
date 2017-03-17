import '../../../css/topics.scss'

import m from 'mithril'
import timeago from '../share/timeago.js'
import {list, listTile, fab, icon} from 'polythene'
import {loadTopicList} from '../../controllers/topics'

// component
const Avatar = {
  view: vnode => {
    const user = vnode.attrs.user
    return(
      m(icon, {
        type: 'medium',
        class: 'app-topics-avatar avatar--circle',
        src: user.avatar_url
      })
    )
  }
}

const TileContent = {
  renderCreatedOrReplied: topic => {
    if (topic.replied_at) {
      return(
        <span>
          <time oncreate={timeago} datetime={topic.replied_at}></time>
          回复
        </span>
      )
    } else {
      return(
        <span>
          <time oncreate={timeago} datetime={topic.created_at}></time>
          发表
        </span>
      )
    }
  },
  view: vnode => {
    const topic = vnode.attrs.topic
    return(
      <div className="app-topics-content">
        <div className="app-topics-title">{topic.title}</div>
        <div className="app-topics-meta">
          <span>
            <b className="app-topics-login">{topic.user.login}</b>
            <em className="app-topics-node">{topic.node_name}</em>
            {TileContent.renderCreatedOrReplied(topic)}
          </span>
          <span>{topic.replies_count + ' / ' + topic.hits}</span>
        </div>
      </div>
    )
  }
}

const Tile = {
  view: vnode => {
    const topic = vnode.attrs.topic
    return(
      m(listTile, {
        front: m(Avatar, {user: topic.user}),
        content: m(TileContent, {topic: topic}),
        ink: true,
        url: {
          href: '/topics/' + topic.id,
          oncreate: m.route.link
        }
      })
    )
  }
}

const List = {
  generateTiles: (list) => {
    return list.map(v => {
      return m(Tile, {topic: v})
    })
  },
  view: vnode => {
    return(
      m(list, {
        class: 'app-topics',
        tiles: List.generateTiles(vnode.attrs.list)
      })
    )
  }
}

export default List