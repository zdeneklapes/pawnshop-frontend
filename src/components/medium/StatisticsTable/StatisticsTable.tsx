import { FC, useState, useEffect } from 'react'
import { dateFormatFromDatabase } from '@components/globals/utils'
import { StatisticsTableProps } from '@components/medium/StatisticsTable/StatisticsTable.types'
import { Input } from '@components/small/Input'
import Router from 'next/router'

const StatisticsTable: FC<StatisticsTableProps> = ({ statistics = [] }) => {
  const [stat, setStat] = useState(statistics)
  useEffect(() => {
    setStat(
      statistics.sort(function (a, b) {
        return b.id - a.id
      })
    )
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
    <div className="flex h-[calc(100vh-128px)] flex-col">
      <Input
        className="flex justify-center"
        name="autocomplete"
        classNameInput="w-96"
        placeholder="Vyhladávaní"
        onChange={(value) => setStat(getFilteredStatistics(value))}
      />
      <div className="mx-10 mt-10 flex flex-row rounded-t border-x border-t border-gray-400  p-3 font-bold">
        <div className="w-[9%]">Stat id</div>
        <div className="w-[15%]">Kdo</div>
        <div className="w-[15%]">Produkt</div>
        <div className="w-[17%]">Datum</div>
        <div className="w-[28%]">Ukon</div>
        <div className="w-[8%]">Cena</div>
        <div className="w-[9%]">Produkt</div>
      </div>
      <div className="mx-10 mb-4 flex flex-col divide-y divide-gray-400 overflow-y-auto rounded-b border border-gray-400">
        {stat.map((statistic) => (
          <div
            key={statistic.id}
            onClick={() =>
              Router.push({
                pathname: '/vytvorit',
                query: { productid: statistic.product }
              })
            }
            className="flex w-full flex-row items-center space-x-1 p-3 hover:cursor-pointer hover:border-black  hover:bg-gray-50"
          >
            <div className="w-[9%] truncate"> {statistic.id}</div>
            <div className="w-[15%] truncate"> {statistic.username}</div>
            <div className="w-[15%] truncate"> {statistic.product_name}</div>
            <div className="w-[17%] truncate"> {dateFormatFromDatabase(statistic.datetime, 'dd/MM/yyyy HH:mm')}</div>
            <div className="w-[28%] truncate "> {statistic.description}</div>
            <div className="w-[9%] truncate"> {statistic.price}</div>
            <div className="w-[9%] truncate"> {statistic.product}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatisticsTable
