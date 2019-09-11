export default {
    path : '/movie',
    component : () => import('@/views/Movie'),
    children :[
        {
            path : 'city',
            component : () => import ('@/components/City')
        },
        {
            path : 'comingsoon',
            component : () => import ('@/components/ComingSoon')
        },
        {
            path : 'playingnow',
            component : () => import ('@/components/PlayingNow')
        },
         {
            path : 'search',
            component : () => import ('@/components/Search')
        },
        {
            path : 'detail/1/:movieId',
            components : {
                default : () => import ('@/components/PlayingNow'),
                detail : () => import('@/views/Movie/detail') 
            },
            props : {
                detail : true
            }
        },
        {
            path : 'detail/2/:movieId',
            components : {
                default : () => import ('@/components/ComingSoon'),
                detail : () => import('@/views/Movie/detail') 
            },
            props : {
                detail : true
            }
        },
        {
            path : '/',
            redirect : '/movie/playingnow'
        }
    ]
   
}