import React, { useState } from 'react'
// 更高级的table
import MaterialTable from 'material-table'
// table config
import { columnsArr, optionsSetting, localizationConfig } from './materialTableConfig'
// mock data
import { memberList } from '../../dbdata/memberdata'

export default function MaterialTableWrap() {
  const [data, setData] = useState(memberList)
  const pageSizeChange = (pageSize) => {
    console.log(`pageSize change ${pageSize}`)
  }
  const pageChange = (page) => {
    console.log(`page change ${page}`)
  }
  const showHandle = (column, hidden) => {
    console.log(column, hidden)
  }
  return (
    <MaterialTable
      title=""
      columns={columnsArr}
      data={data}
      options={optionsSetting}
      // 显示设置
      localization={localizationConfig}
      onChangePage={pageChange}
      onChangeRowsPerPage={pageSizeChange}
      onChangeColumnHidden={showHandle}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              setData(prevState => {
                const nextData = [...prevState]
                const dataLength = nextData.length
                nextData.unshift({ ...newData, index: dataLength, uuid: Math.random().toString(36).slice(2, 8) })
                return [...nextData]
              })
            }, 600)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              if (oldData) {
                setData(prevState => {
                  const data = [...prevState]
                  const currentIndex = data.findIndex(item => item.uuid === oldData.uuid)
                  data[currentIndex] = { ...newData }
                  return [...data]
                })
              }
            }, 600)
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              setData(prevState => {
                const data = [...prevState]
                const deleteIndex = data.findIndex(item => item.uuid === oldData.uuid)
                console.log(oldData, '被删除了')
                data.splice(deleteIndex, 1)
                return [...data]
              })
            }, 600)
          }),
      }}
    />
  )
}
