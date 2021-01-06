import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import MemoForm from "app/memos/components/MemoForm"
import updateMemo from "app/memos/mutations/updateMemo"
import getMemo from "app/memos/queries/getMemo"
import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const EditMemo = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const memoId = useParam("memoId", "number")
  const [memo, { setQueryData }] = useQuery(getMemo, { where: { id: memoId } })
  const [updateMemoMutation] = useMutation(updateMemo)

  return (
    <div>
      <h1>Edit Memo {memo.id}</h1>
      <pre>{JSON.stringify(memo)}</pre>

      <MemoForm
        initialValues={memo}
        onSubmit={async (event) => {
          if (currentUser) {
            try {
              const updated = await updateMemoMutation({
                where: { id: memo.id },
                data: {
                  title: event.target[0].value,
                  body: event.target[1].value,
                  user: { connect: { id: currentUser.id } },
                },
              })
              await setQueryData(updated)
              alert("Success!" + JSON.stringify(updated))
              router.push(`/memos/${updated.id}`)
            } catch (error) {
              console.log(error)
              alert("Error editing memo " + JSON.stringify(error, null, 2))
            }
          }
        }}
      />
    </div>
  )
}

const EditMemoPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMemo />
      </Suspense>

      <p>
        <Link href="/memos">
          <a>Memos</a>
        </Link>
      </p>
    </div>
  )
}

EditMemoPage.getLayout = (page) => <Layout title={"Edit Memo"}>{page}</Layout>

export default EditMemoPage
