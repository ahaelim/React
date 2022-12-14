import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Q1. 영화 데이터를 테이블 형태로 렌더링
// 랭킹 - 영화제목 - 개봉일자
// React JSX 특징 <table>를 <thead><tbody> 없이 사용 불가
// <table>
//  <tbody>
//      <tr>td*3</tr>
//  </tbody>
// </table>

const Ex09 = () => {
    const [data, setData] = useState([])
    let month = ['01','02','03','04','05','06','07','08','09','10']
    
    const getData = (selectM) => {
        console.log('원하는 달',selectM)
        let url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=2022${selectM}01`
        
        axios
        .get(url)
        .then((res)=>{
            // 영화 순위가 모여있는 배열 : data
            // 영화이름 : movieNm / 개봉일자 : openDt / 랭킹 : rank
            setData(res.data.boxOfficeResult.dailyBoxOfficeList) 
        })
        .catch(()=>{alert('error!')})
    }
    const Ck = (e) =>{
        getData(e.target.value)
        
    }

    useEffect(()=>{
        // 현재 날짜 => 몇월
        let todayMonth = new Date().getMonth()+1
        getData(todayMonth)
    },[])

  return (
    <div>
        <h1>2022년 올해의 영화</h1>
        <p>매달 1일 순위를 보여드립니다!</p>
        {month.map((item)=>(<button onClick={Ck} key = {item.month} value={item}>{item}월</button>))}
        <table width={800}>
            <tbody>
                {/* 여기서부터 반복 시작! */}
                {data.map((item)=>(
                <tr key = {item.rank}>
                    <td>{item.rank}</td>
                    <td>{item.movieNm}</td>
                    <td>{item.openDt}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Ex09