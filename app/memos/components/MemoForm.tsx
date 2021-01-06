import React from "react"

type MemoFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const MemoForm = ({ initialValues, onSubmit }: MemoFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <div>メモ作りたいだけなのに</div>

      <input placeholder="タイトル" defaultValue={initialValues.title}/>
      <br/>
      <textarea placeholder="本文" defaultValue={initialValues.body}/>
      <br/>
      <button>メモを作成する</button>
    </form>
  )
}

export default MemoForm
