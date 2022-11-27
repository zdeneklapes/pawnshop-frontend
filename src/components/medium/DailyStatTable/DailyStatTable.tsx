import { FC, useState, useEffect } from 'react'
import { dateFormatFromDatabase } from '@components/globals/utils'
import { DailyStatTableProps } from '@components/medium/DailyStatTable/DailyStatTable.types'
import { Input } from '@components/small/Input'

const DailyStatTable: FC<DailyStatTableProps> = ({ dailystats = [] }) => {
  const [dailySta, setDailySta] = useState(dailystats)
  useEffect(() => {
    setDailySta(
      dailystats.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    )
  }, [dailystats])

  const [selectedStat, setSelectedStat] = useState(dailystats.slice(0))

  const getFilteredDailyStats = (value?: string) => {
    if (!value) {
      return dailystats
    } else {
      return dailystats.filter(
        (el) => dateFormatFromDatabase(el.date, 'dd/MM/yyyy') === value || el.all_profit.toString() === value
      )
    }
  }

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-2">
        <Input
          className="flex justify-center"
          name="autocomplete"
          classNameInput="w-96"
          placeholder="Vyhladávaní"
          onChange={(value) => setDailySta(getFilteredDailyStats(value))}
        />
        <div className="flex flex-row p-3 font-bold border-gray-400 rounded-t border-x border-t  mx-10 mt-10">
          <div className="w-[100%]">Datum</div>
        </div>

        <div className="flex flex-col divide-gray-400 divide-y border-gray-400 border  rounded-b mx-10 overflow-y-auto max-h-[700px]">
          {dailySta.map((dailystat) => (
            <div
              key={dailystat.id}
              onClick={() => setSelectedStat(dailystat)}
              className="flex flex-row space-x-1 items-center w-full p-3 hover:border-black hover:bg-gray-50  hover:cursor-pointer"
            >
              <div className="w-[100%] truncate"> {dateFormatFromDatabase(dailystat.date, 'dd/MM/yyyy')}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col mx-5 mt-1">
        <div className="flex flex-row font-bold text-lg">Datum: {selectedStat.date}</div>
        <div className="flex flex-row font-bold text-lg mt-12">Zastavarna</div>
        <div className="flex flex-row">
          <div className="flex flex-col p-3 font-bold rounded-t border-r">
            <div className="h-[10%] flex justify-left my-1">Zastaveno</div>
            <div className="h-[10%] flex justify-left my-1">za</div>
            <div className="h-[10%] flex justify-left my-1">Vraceno</div>
            <div className="h-[10%] flex justify-left my-1">za</div>
            <div className="h-[10%] flex justify-left my-1">Prodlouzeno</div>
            <div className="h-[10%] flex justify-left my-1">Zisk</div>
          </div>
          <div className="flex flex-col p-3 rounded-t">
            <div className="h-[10%] flex justify-left my-1">{selectedStat.loan_create_count}</div>
            <div className="h-[10%] flex justify-left my-1">{selectedStat.loan_income} Kc</div>
            <div className="h-[10%] flex justify-left my-1">{selectedStat.loan_return_count}</div>
            <div className="h-[10%] flex justify-left my-1">{selectedStat.loan_outcome} Kc</div>
            <div className="h-[10%] flex justify-left my-1">{selectedStat.loan_extend_count}</div>
            <div className="h-[10%] flex justify-left my-1">{selectedStat.loan_profit} Kc</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-5 mt-20">
        <div className="flex flex-row font-bold text-lg">Bazar</div>
        <div className="flex flex-row">
          <div className="flex flex-col p-3 font-bold rounded-t border-r">
            <div className="h-[10%] flex justify-left my-1">Vykoupeno</div>
            <div className="h-[10%] flex justify-left my-1">za</div>
            <div className="h-[10%] flex justify-left my-1">Prodano</div>
            <div className="h-[10%] flex justify-left my-1">za</div>
            <div className="h-[10%] flex justify-left my-1">Zisk</div>
          </div>
          <div className="flex flex-col p-3 rounded-t">
            <div className="h-[10%] flex justify-left my-1">{selectedStat.offer_create_count}</div>
            <div className="h-[10%] flex justify-left my-1">{selectedStat.offer_income} Kc</div>
            <div className="h-[10%] flex justify-left my-1">{selectedStat.offer_sell_count}</div>
            <div className="h-[10%] flex justify-left my-1">{selectedStat.offer_outcome} Kc</div>
            <div className="h-[10%] flex justify-left my-1">{selectedStat.offer_profit} Kc</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-5 mt-20">
        <div className="flex flex-row font-bold text-lg">Celkem</div>
        <div className="flex flex-row">
          <div className="flex flex-col p-3 font-bold rounded-t border-r">
            <div className="h-[10%] flex justify-left my-2">Prijmuto</div>
            <div className="h-[10%] flex justify-left my-2">Trzba</div>
            <div className="h-[10%] flex justify-left my-2">Vydelek</div>
          </div>
          <div className="flex flex-col p-3 rounded-t">
            <div className="h-[10%] flex justify-left my-2">{selectedStat.all_income} Kc</div>
            <div className="h-[10%] flex justify-left my-2">{selectedStat.all_outcome} Kc</div>
            <div className="h-[10%] flex justify-left my-2">{selectedStat.all_profit} Kc</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyStatTable
