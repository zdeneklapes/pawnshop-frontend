import { useState, useEffect } from 'react'
import { fetchProducts } from '@api/service/service'

const ShopStatTable = () => {
  const [shopStats, setShopStats] = useState<any>([])

  useEffect(() => {
    fetchProducts('SHOP_STATS').then((fetchedStats) => {
      setShopStats(fetchedStats)
    })
  }, [])

  return (
    <div>
      <div className="flex flex-row p-3 font-bold rounded-t mx-10 mt-10">
        <div className="w-1/5 flex justify-center border-r">Typ produktu</div>
        <div className="w-1/5 flex justify-center border-r">Počet produktu</div>
        <div className="w-1/5 flex justify-center border-r">Nákupní cena</div>
        <div className="w-1/5 flex justify-center">Prodejní cena</div>
        <div className="w-1/5 flex justify-center">Očekávaný zisk</div>
      </div>

      <div className="flex flex-col  rounded-b mx-10 overflow-y-auto max-h-[600px]">
        {shopStats.map((stat: any) => (
          <div key={stat.status} className="flex flex-row space-x-1 items-center w-full p-3">
            <div className="w-1/5 flex justify-center truncate border-r"> {stat.status}</div>
            <div className="w-1/5 flex justify-center truncate border-r">{stat.count}</div>
            <div className="w-1/5 flex justify-center truncate border-r">{stat.buy}</div>
            <div className="w-1/5 flex justify-center truncate">{stat.sell}</div>
            <div className="w-1/5 flex justify-center">{stat.sell - stat.buy}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopStatTable
