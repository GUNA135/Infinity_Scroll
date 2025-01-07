import React, { useEffect, useState, useRef } from 'react'
import './css/InfinityScroll.css'
import SearchBar from '../../components/searchBar'
import Select from '../../components/select'
import { Card, CardHeader, CardBody } from '../../components/card'
import { LIST_API, USERS_API } from '../../utils/url'
import { apiCall, debounce } from '../../utils/Constant'
import { useDispatch, useSelector } from 'react-redux';
import { setListData, setUserData, search, filter, setStatus } from '../../redux/actions/InfinityScrollAction';

const InfinityScroll = () => {

  const [page, setPage] = useState(1);

  const cardContainerRef = useRef(null);

  const list = useSelector((state) => state?.infinityScrollStore?.filteredPosts)
  const options = useSelector((state) => state?.infinityScrollStore?.options)
  const searchQuery = useSelector((state) => state?.infinityScrollStore?.searchQuery)
  const selectedUserId = useSelector((state) => state?.infinityScrollStore?.selectedUserId)
  const status = useSelector((state) => state?.infinityScrollStore?.status)

  const dispatch = useDispatch()
  const debounceSearch = debounce((value) => {
    dispatch(search(value))
  }, 500)

  useEffect(() => {
    const fetchLists = async () => {
      await apiCall(LIST_API, 'GET', {}, {}, 'lists', dispatch, setStatus)?.then((res) => {
        if (res?.success) {
          dispatch(setListData(res?.data))
        }
      })
    }

    const fetchUsers = async () => {
      await apiCall(USERS_API, 'GET', {}, {}, 'users', dispatch, setStatus)?.then((res) => {
        if (res?.success) {
          dispatch(setUserData(res?.data))
        }
      })
    }

    fetchLists()
    fetchUsers()
  }, [dispatch])

  const handleSearch = (e) => {
    debounceSearch(e?.target?.value)
  }

  const handleSelect = (e) => {
    dispatch(filter(e?.value))
  }

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filteredPosts = list?.slice(0, page * 16);

  useEffect(() => {
    const handleScroll = () => {
      const container = cardContainerRef?.current;

      if (filteredPosts?.length < list?.length) {
        if (container) {
          const isBottom = container?.scrollHeight - container?.scrollTop <= container?.clientHeight + 10;
          if (isBottom) {
            setTimeout(() => {
              loadMorePosts();
            }, 1000);
          }
        }
      }
    };

    const container = cardContainerRef?.current;
    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };

  }, [list, filteredPosts]);

  console.log('qqq-1',options)

  return (
    <div className='infinity-scroll-parent-container'>
      <section className='infinity-scroll-header-section'>
        <SearchBar placeholder="Search..." onChange={(e) => handleSearch(e)} defaultValue={searchQuery} key={selectedUserId} />
        <Select defaultSelect={'All'} options={options} onSelect={(e) => handleSelect(e)} />
      </section>
      {!status?.lists?.error && <section ref={cardContainerRef} className='infinity-scroll-body-parent-container'>
        {!filteredPosts || filteredPosts?.length == 0 && !status?.lists?.loading && !status?.lists?.error && <div className='infinity-scroll-body-no-data-found'>
          <p>Result Not Found !</p>
        </div>}
        {!status?.lists?.loading && !status?.lists?.error && <div className='infinity-scroll-card-parent-container'>
          {filteredPosts && filteredPosts?.length > 0 && filteredPosts?.map((value, index) => {
            return (
              <Card key={index} className={'infinity-scroll-card'}>
                <CardHeader className={'infinity-scroll-card-title'}>
                  {value?.title}
                </CardHeader>
                <CardBody className={'infinity-scroll-card-body'}>
                  {value?.body}
                </CardBody>
              </Card>
            )
          })}
        </div>}
        {(filteredPosts?.length < list?.length || status?.lists?.loading) && <p className='infinity-scroll-loading-text'>Loading...</p>}
      </section>}
      {status?.lists?.error && <pre>
        {status?.lists?.error?.message || 'Something went wrong !'}
      </pre>}
    </div>
  )
}

export default React.memo(InfinityScroll)