import { FC, useState, useEffect } from 'react'
import { dateFormatFromDatabase } from '@components/globals/utils'
import { StatisticsTableProps } from '@components/medium/StatisticsTable/StatisticsTable.types'
import { Input } from '@components/small/Input'
import Router from 'next/router'

const StatisticsTable: FC<StatisticsTableProps> = ({ statistics = [] }) => {
  const [stat, setStat] = useState(statistics)
  useEffect(() => {
    setStat(statistics.sort(function(a, b){
    return b.id - a.id;
}))
  }, [statistics])

  const getFilteredStatistics = (value?: string) => {
    if (!value) {
      return statistics
    } else {
      return statistics.filter(
        (el) =>
          el.username.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          el.description.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          dateFormatFromDatabase(el.datetime, 'dd/MM/yyyy') === value ||
          el.price.toString() === value ||
          el.amount.toString() === value ||
          el.profit.toString() === value ||
          el.id.toString() === value
      )
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-128px)]">
      <Input
        className="flex justify-center"
        name="autocomplete"
        classNameInput="w-96"
        placeholder="Vyhladávaní"
        onChange={(value) => setStat(getFilteredStatistics(value))}
      />
      <div className="flex flex-row p-3 font-bold border-gray-400 rounded-t border-x border-t  mx-10 mt-10">
        <div className="w-[9%]">Stat id</div>
        <div className="w-[13%]">Kdo</div>
        <div className="w-[17%]">Datum</div>
        <div className="w-[25%]">Ukon</div>
        <div className="w-[9%]">Pocet</div>
        <div className="w-[9%]">Cena</div>
        <div className="w-[9%]">Profit</div>
        <div className="w-[9%]">Produkt</div>
      </div>
      <div className="flex flex-col flex-grow divide-gray-400 divide-y border-gray-400 border  rounded-b mx-10 overflow-y-auto">
        {stat.map((statistic) => (
          <div
            key={statistic.id}
            onClick={() => Router.push({
          pathname: '/vytvorit',
          query: { productid: statistic.product },
        })} //todo
            className="flex flex-row space-x-1 items-center w-full p-3 hover:border-black hover:bg-gray-50  hover:cursor-pointer"
          >
            <div className="w-[9%] truncate"> {statistic.id}</div>
            <div className="w-[13%] truncate"> {statistic.username}</div>
            <div className="w-[17%] truncate"> {dateFormatFromDatabase(statistic.datetime, 'dd/MM/yyyy HH:mm')}</div>
            <div className="w-[25%] truncate "> {statistic.description}</div>
            <div className="w-[9%] truncate"> {statistic.amount}</div>
            <div className="w-[9%] truncate"> {statistic.price}</div>
            <div className="w-[9%] truncate"> {statistic.profit}</div>
            <div className="w-[9%] truncate"> {statistic.product}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatisticsTable
