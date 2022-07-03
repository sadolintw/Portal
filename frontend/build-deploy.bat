echo %S3_PORTAL%
call npm run build-win:staging
call cd build
call echo "update files"
call aws s3 rm s3://%S3_PORTAL%/ --recursive
call aws s3 sync . s3://%S3_PORTAL%/
call echo "invalidation"
call aws cloudfront create-invalidation --distribution-id %CLOUDFRONT_PORTAL% --paths="/*"
call echo "completed"
call cd ..