import React from 'react'
import TableEditButton from './button/TableEditButton'
import TableDeleteButton from './button/TableDeleteButton'

function ContentTable({ tableHeaderHtml, tableBodyHtml }) {
    return (
        <section className="mt-3 mb-3 fixed-table">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {tableHeaderHtml()}
                    </tr>
                </thead>
                <tbody>
                    {tableBodyHtml()}
                    {/* <tr className="align-middle">
                        <td>1.</td>
                        <td>Update software</td>
                        <td>

                        </td>
                        <td>
                            <TableEditButton />
                            <TableDeleteButton />
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </section>
    )
}

export default ContentTable
