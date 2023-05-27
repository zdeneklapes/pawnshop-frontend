const navigationRoutes = [
  {route: '/contracts', name: 'Contracts'},
  {route: '/new', name: 'New'},
  {route: '/attendants', name: 'Attendants'},
  {route: '/statistics', name: 'Statistics'},
]

const Sidebar = () => {
  console.warn(navigationRoutes)
  return (
    <div className="mt-2 flex w-64 flex-col border-r border-gray-300 px-2">
      Sidebar
    </div>
  )
}

export default Sidebar
