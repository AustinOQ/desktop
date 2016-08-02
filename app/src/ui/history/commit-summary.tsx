import * as React from 'react'
import { FileChange } from '../../models/status'
import List from '../list'

interface ICommitSummaryProps {
  readonly summary: string
  readonly body: string
  readonly files: ReadonlyArray<FileChange>
  readonly selectedFile: FileChange | null
  readonly onSelectedFileChanged: (file: FileChange) => void
}

export default class CommitSummary extends React.Component<ICommitSummaryProps, void> {
  private onSelectionChanged(row: number) {
    const file = this.props.files[row]
    this.props.onSelectedFileChanged(file)
  }

  private renderFile(row: number) {
    const file = this.props.files[row]
    return <div key={file.path}
                title={file.path}
                className='path'>{file.path}</div>
  }

  private rowForFile(file_: FileChange | null): number {
    const file = file_
    if (!file) { return -1 }

    let index = 0
    this.props.files.forEach((f, i) => {
      if (f.path === file.path) {
        index = i
        return
      }
    })
    return index
  }

  public render() {
    return (
      <div className='panel' id='commit-summary'>
        <div className='commit-summary-title'>{this.props.summary}</div>
        <div className='commit-summary-description'>{this.props.body}</div>
        <div className='files'>
          <List rowRenderer={row => this.renderFile(row)}
                rowCount={this.props.files.length}
                rowHeight={40}
                selectedRow={this.rowForFile(this.props.selectedFile)}
                onSelectionChanged={row => this.onSelectionChanged(row)}/>
        </div>
      </div>
    )
  }
}
