// Data
const allTunnels = [
	{
		id: 1,
		diamond: false
	},
	{
		id: 15,
		diamond: false,
		tunnels: [
			{
				id: 16,
				diamond: false
			}
		]
	}
]

const findITemById = (initItems, id, items) => {
	// Data
	const parentItems = []
	
	// Actions
	const goDown   = (p) => p.concat(0)
	const goBack   = (p) => p.slice(0, p.length-1)
	const goToNext = (p) => p.map((item, i) => i === p.length-1 ? item+1 : item)
	
	// Conditions
	const isExactItem  = (item, currId) => {
		return item['id'] === currId
	}
	const hasItems     = (item) => item[items]
	const isItemExist  = (parItem, p) => parItem[items][p[p.length-1]]
	const areInitItems = (p) => p.length <= 3
	const isOverSearch = (p) => p[p.length-1] >= initItems.length
	
	// Function
	const findItem = (currItems, currId, position) => {
		
		const currItem = currItems[position[position.length-1]]
		
		if (isExactItem(currItem, currId)) return currItem
		
		position = goDown(position)
		
		if (hasItems(currItem) && isItemExist(currItem, position)) {
			parentItems.unshift(currItem)
			return findItem(currItem[items], currId, position)
		}
		
		
		
		
		
		if (areInitItems(position)) {
			position = goBack(position)
			
			if (position.length > 1) {
				position = goBack(position)
			}
			
			position = goToNext(position)
			
			if (isOverSearch(position)) return -1
			
			
			const nextItem = initItems[position[position.length-1]]
			
			if (isExactItem(nextItem, currId)) return nextItem
			
			position = goDown(position)
			
			return findItem(nextItem[items], currId, position)
		}
		
		const findNextItem = (p) => {
			const parItem = parentItems[0]
			
			p = goBack(p)
			p = goToNext(p)
			
			if (isItemExist(parItem, p))
				return findItem(parItem[items], currId, p)
			
			parentItems.shift()
			
			return findNextItem(p)
		}
		
		return findNextItem(position)
	}
	
	return findItem(initItems, id, [0])
}

console.log(findITemById(allTunnels, 1, 'tunnels'))
// console.log(findITemById(allTunnels, 16, 'tunnels'))
// console.log(findITemById(allTunnels, 18, 'tunnels'))