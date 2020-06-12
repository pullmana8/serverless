import * as React from 'react'

import Auth from '../auth/Auth'

enum UploadState {
    NoUpload,
    FetchingPresignedUrl,
    UploadingFile,
}

interface EditTodoProps {
    match: {
        params: {
            todoId: string
        }
    }
    auth: Auth
}

interface EditTodoState {
    file: any
    uploadState: UploadState
}

export class EditTodo extends React.PureComponent<EditTodoProps, EditTodoState> {
    state: EditTodoState = {
        file: undefined,
        uploadState: UploadState.NoUpload
    }
}