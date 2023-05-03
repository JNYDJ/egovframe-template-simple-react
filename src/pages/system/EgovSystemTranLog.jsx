import React, { useState, useCallback, useEffect } from 'react';

import * as EgovNet from 'api/egovFetch';

import { useInView } from 'react-intersection-observer';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavLog';

function EgovSystemTranLog() {
 
  const [ref, inView] = useInView();
  
  const [nextPage, setNextPage] = useState(0);
  useEffect(() => {
        if (inView) {
            retrieveListt({pageIndex: nextPage});
            setNextPage(nextPage + 10);
        }
  }, [ inView ]);

  const [listTag, setListTag] = useState([]);

  const retrieveList = useCallback((srchCnd) => {
      console.log("EgovLoginContent submitFormHandler()");

      const retrieveListURL = '/syst/systlogl003/selectMenuLogMngList.do';
        const jToken = localStorage.getItem('jToken');
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': jToken
            },
            body: JSON.stringify(srchCnd)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {

                let mutListTag = [];
                listTag.push(<p className="no_data" key="0">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값

                //const resultCnt = parseInt(resp.result.resultCnt);
                const targetStyle = { height: "200px" };

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {

                    if (index === 0) mutListTag = []; // 목록 초기화

                    mutListTag.push(
                            <div className="list_item">
                            <div>{item.seq}</div>
                            <div>{item.userId}</div>
                            <div>{item.userNm}</div>
                            <div>{item.menuPathNm}</div>
                            <div>{item.transGbn}</div>
                            <div>{item.regDt}</div>
                            <div>{item.regTime}</div>
                            <div>{item.connectIp}</div>
                        </div>
                    );

                    if (index === 9) {
                        
                    }
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
  },[listTag]);

  const retrieveListt = useCallback((srchCnd) => {
      console.log("EgovLoginContent submitFormHandler()");

      const retrieveListURL = '/syst/systlogl003/selectMenuLogMngList.do';
        const jToken = localStorage.getItem('jToken');
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': jToken
            },
            body: JSON.stringify(srchCnd)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {

                let mutListTag = [];               
                

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {

                    //if (index === 0) mutListTag = []; // 목록 초기화

                    mutListTag.push(
                        <div className="list_item" id="listItem">
                            <div>{item.seq}</div>
                            <div>{item.userId}</div>
                            <div>{item.userNm}</div>
                            <div>{item.menuPathNm}</div>
                            <div>{item.transGbn}</div>
                            <div>{item.regDt}</div>
                            <div>{item.regTime}</div>
                            <div>{item.connectIp}</div>
                        </div>
                    );
                });
                setListTag([...listTag, mutListTag]);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
  },[listTag]);

  return (
      <div className="container">
          <div className="c_wrap">
              {/* <!-- Location --> */}
              <div className="location">
                  <ul>
                      <li><a className="home" href="#!">Home</a></li>
                      <li><a href="#!">시스템관리</a></li>
                      <li><a href="#!">로그관리</a></li>
                      <li>트랜잭션 로그</li>
                  </ul>
              </div>
              {/* <!--// Location --> */}

              <div className="layout">
                  {/* <!-- Navigation --> */}
                  <EgovLeftNav></EgovLeftNav>
                  {/* <!--// Navigation --> */}
                  
                  <div className="contents BUSINESS_INTRO" id="contents">
                      {/* <!-- 본문 --> */}

                      <h1 className="tit_3">트랜잭션 로그</h1>

                      <div>
                          <ul>
                              <li align="right">
                                  <button type="button" className="btn btn_blue_h46 pd35" onClick={() => {
                                                retrieveList({pageIndex: 0});
                                                //retrieveList({});
                                            }}><span>조회</span></button>
                              </li>
                              &nbsp;
                          </ul>
                      </div>



                      {/* <!-- 게시판목록 --> */}
                      <div className="board_list LOG003">
                          <div className="head">
                              <span>번호</span>
                              <span>사용자ID</span>
                              <span>사용자명</span>
                              <span>메뉴명</span>
                              <span>기능</span>
                              <span>접속일자</span>
                              <span>접속시간</span>
                              <span>IP</span>
                          </div>
                          <div className="result" id="dataList">
                              {listTag}
                          </div>
                      </div>
                      {/* <!--// 게시판목록 --> */}

                      {/* <!--// 본문 --> */}
                    <div id="observerTarget" ref={ref}></div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default EgovSystemTranLog;