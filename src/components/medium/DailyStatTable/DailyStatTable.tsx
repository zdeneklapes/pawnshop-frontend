import { FC, useState, useEffect } from 'react'
import { dateFormatFromDatabase } from '@components/globals/utils'
import { DailyStatTableProps } from '@components/medium/DailyStatTable/DailyStatTable.types'
import { Input } from '@components/small/Input'

const DailyStatTable: FC<DailyStatTableProps> = ({ dailystats = [] }) => {
  const [dailySta, setDailySta] = useState(dailystats)
  useEffect(() => {
    setDailySta(dailystats.sort(function(a, b){
    return new Date(b.date).getTime() - new Date(a.date).getTime();
}))
  }, [dailystats])

  const getFilteredDailyStats = (value?: string) => {
    if (!value) {
      return dailystats
    } else {
      return dailystats.filter(
        (el) =>
          dateFormatFromDatabase(el.date, 'dd/MM/yyyy') === value ||
          el.all_income.toString() === value ||
          el.all_outcome.toString() === value ||
          el.all_profit.toString() === value
      )
    }
  }

  return (
    <div>
      <Input
        className="flex justify-center"
        name="autocomplete"
        classNameInput="w-96"
        placeholder="Vyhladávaní"
        onChange={(value) => setDailySta(getFilteredDailyStats(value))}
      />
      <div className="flex flex-row p-3 font-bold border-gray-400 rounded-t border-x border-t  mx-10 mt-10">
        <div className="w-[13%]">Datum</div>
        <div className="w-[7%]">LoanCre</div>
        <div className="w-[7%]">LoanExt</div>
        <div className="w-[7%]">LoanRet</div>
        <div className="w-[7%]">LoanInc</div>
        <div className="w-[7%]">LoanOut</div>
        <div className="w-[7%]">LoanPro</div>
        <div className="w-[7%]">OfferCre</div>
        <div className="w-[7%]">OfferSel</div>
        <div className="w-[7%]">OfferInc</div>
        <div className="w-[7%]">OfferOut</div>
        <div className="w-[7%]">OfferPro</div>
        <div className="w-[7%]">AllInc</div>
        <div className="w-[7%]">AllOut</div>
        <div className="w-[7%]">AllPro</div>
      </div>
      <div className="flex flex-col divide-gray-400 divide-y border-gray-400 border  rounded-b mx-10 overflow-y-auto max-h-[700px]">
        {dailySta.map((dailystat) => (
          <div
            key={dailystat.id}
            className="flex flex-row space-x-1 items-center w-full p-3 hover:border-black hover:bg-gray-50  hover:cursor-pointer"
          >
            <div className="w-[13%] truncate"> {dateFormatFromDatabase(dailystat.date, 'dd/MM/yyyy HH:mm')}</div>
            <div className="w-[7%] truncate"> {dailystat.loan_create_count}</div>
            <div className="w-[7%] truncate"> {dailystat.loan_extend_count}</div>
            <div className="w-[7%] truncate"> {dailystat.loan_return_count}</div>
            <div className="w-[7%] truncate"> {dailystat.loan_income}</div>
            <div className="w-[7%] truncate"> {dailystat.loan_outcome}</div>
            <div className="w-[7%] truncate"> {dailystat.loan_profit}</div>
            <div className="w-[7%] truncate"> {dailystat.offer_create_count}</div>
            <div className="w-[7%] truncate"> {dailystat.offer_sell_count}</div>
            <div className="w-[7%] truncate"> {dailystat.offer_income}</div>
            <div className="w-[7%] truncate"> {dailystat.offer_outcome}</div>
            <div className="w-[7%] truncate"> {dailystat.offer_profit}</div>
            <div className="w-[7%] truncate"> {dailystat.all_income}</div>
            <div className="w-[7%] truncate"> {dailystat.all_outcome}</div>
            <div className="w-[7%] truncate"> {dailystat.all_profit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyStatTable
