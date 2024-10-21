/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react"
import { Search, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// List of meme coins to display with their API endpoints
const memeCoins = [
  "spx6900", "gigachad-2", "pepe", "popcat", "dogwifcoin", "fwog", "sigma", "retardio", "apu", "daddy-tate",
  "smoking-chicken-fish", "mini", "mother-iggy", "lock-in", "michicoin", "mog-coin", "bitcoin", "billy", "ponke", "sad-hamster", "selfiedogcoin", "zyncoin-2"
]

// Custom names for specific coins
const customNames: { [key: string]: string } = {
  "gigachad-2": "Giga",
  "dogwifcoin": "Wif",
  "apu": "Apu",
  "daddy-tate": "Daddy",
  "smoking-chicken-fish": "SCF",
  "mother-iggy": "Mother",
  "lock-in": "Lock in",
  "michicoin": "Michi",
  "mog-coin": "Mog",
  "bitcoin": "BITCOIN",
  "sad-hamster": "Hammy",
  "selfiedogcoin": "Selfie",
  "zyncoin-2": "Zyn"
}

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

export default function TopMemeCoins() {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${memeCoins.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data: CoinData[] = await response.json()
      
      // Create a map of fetched coins
      const coinMap = new Map(data.map(coin => [coin.id, coin]))
      
      // Ensure all memeCoins are represented, use placeholder data if necessary
      const allCoins = memeCoins.map(id => {
        if (coinMap.has(id)) {
          const coin = coinMap.get(id)!
          return {
            ...coin,
            name: customNames[id] || coin.name // Use custom name if available
          }
        } else {
          return {
            id,
            name: customNames[id] || id.charAt(0).toUpperCase() + id.slice(1),
            symbol: id.toUpperCase(),
            current_price: 0,
            price_change_percentage_24h: 0,
            total_volume: 0
          }
        }
      })
      
      setCoins(allCoins)
    } catch (err) {
      setError('Error fetching data. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4 space-y-6 h-full flex flex-col">
      <h1 className="text-4xl font-bold text-center mb-8">Top Memes</h1>
      <p className="text-center">(the kol&lsquo;s list until we go to 0)</p>
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search coins..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={fetchData}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex-grow">
        <div className="overflow-auto h-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] sticky top-0 bg-card z-10">#</TableHead>
                <TableHead className="sticky top-0 bg-card z-10">Name</TableHead>
                <TableHead className="text-right sticky top-0 bg-card z-10">Price</TableHead>
                <TableHead className="text-right sticky top-0 bg-card z-10">24h %</TableHead>
                <TableHead className="text-right hidden sm:table-cell sticky top-0 bg-card z-10">Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-red-500">{error}</TableCell>
                </TableRow>
              ) : (
                filteredCoins.map((coin, index) => (
                  <TableRow key={coin.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-bold text-xs">{coin.symbol[0].toUpperCase()}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{coin.name}</div>
                          <div className="text-sm text-muted-foreground">{coin.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${coin.current_price.toFixed(4)}</TableCell>
                    <TableCell className="text-right">
                      <div className={`flex items-center justify-end ${coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </div>
                    </TableCell>
                    <TableCell className="text-right hidden sm:table-cell">${coin.total_volume.toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}