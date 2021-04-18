require.config({
    urlArgs: "v=" + VERSION, // "nonce=" + (new Date()).getTime(),
    waitSeconds: 30,
    paths: {
        'main': '../core/priv/default/js/main',

        // BUNDLES
        'main.bundle': '../build/main.bundle',
        'blogs.bundle': '../build/blogs.bundle',
        'profiles.bundle': '../build/profiles.bundle',
        'registration_constructor.bundle': '../build/registration_constructor.bundle',
        'cabinet.bundle': '../build/cabinet.bundle',
        'career.bundle': '../build/career.bundle',
        'mgmt.bundle': '../build/mgmt.bundle',
        'talks.bundle': '../build/talks.bundle',

        // LIBS
        'text': '../bower_components/requirejs-text/text',
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'jquery-ui': '../bower_components/jquery-ui/jquery-ui.min',
        'jquery-cookie': '../bower_components/jquery.cookie/jquery.cookie',
        'the-modal': '../lib/js/jquery/jquery-the-modal/jquery.the-modal',
        'underscore': '../bower_components/underscore/underscore',
        'nprogress': '../bower_components/nprogress/nprogress',
        'datatables': '../bower_components/datatables/media/js/jquery.dataTables',
        'moment': '../bower_components/moment/moment',
        'moment-ru': '../bower_components/moment/locale/ru',
        'env': '../bower_components/env/dist/env',
        'chartjs': '../bower_components/Chart.js/dist/Chart',
        'chart': '../lib/js/chart/chart.min',
        'qtip': '../bower_components/qtip2/jquery.qtip.min',
        'jqmodal': '../lib/js/jquery/jquery.jqmodal',
        'datetimepicker': '../lib/js/jquery/datetimepicker/jquery.datetimepicker.full.min',
        'chosen': '../lib/chosen/chosen.jquery.min',
        'jquery-mousewheel': '../bower_components/jquery-mousewheel/jquery.mousewheel.min',
        'jquery-form': '../bower_components/jquery-form/jquery.form',
        'markitup': '../bower_components/markitup/markitup/jquery.markitup',
        'jquery-notifier': '../lib/js/jquery/jquery.notifier',
        'msg': '../lib/js/msg',
        'jquery-scrollTo': '../bower_components/jquery.scrollTo/jquery.scrollTo',
        'jquery-tmpl': '../lib/js/jquery/jquery.tmpl.min',
        'jquery-autocomplete': '../lib/js/jquery/jquery.autocomplete',
        'Highlight': '../lib/js/Highlight/highlight.pack',
        'Highlight-lineNumbers': '../lib/js/Highlight/highlightjs-line-numbers',
        'timepicker': '../lib/timepicker/js/jquery-ui-timepicker-addon',
        'jcrop': '../lib/js/fileapi/jcrop/jquery.Jcrop.min',
        'FileAPI': '../lib/js/fileapi/FileAPI/FileAPI.min',
        'exif': '../lib/js/fileapi/FileAPI/FileAPI.exif',
        'jquery-fileapi': '../lib/js/fileapi/jquery.fileapi.min',
        'ckeditor': '../lib/ckeditor/ckeditor',

        // ACHIEVEMENTS
        'achievements-dashboard': '../achievements/admin/js/achievement',

        // MANAGEMENT
        'management_attendance': '../management/priv/default/js/admin_attendance',
        'management_curriculum_marks': '../management/priv/default/js/curriculum_marks',
        'management_schedule_responses': '../management/priv/default/js/admin_schedule_responses',
        'selection_forms': '../management/priv/default/js/selection/forms',
        'selection_list': '../management/priv/default/js/selection/list',
        'selection_dashboard': '../management/priv/default/js/selection/dashboard',
        'selection_control': '../management/priv/default/js/selection/control',
        'selection_control_new': '../management/priv/default/js/selection/control_new',

        // SCHEDULE RESPONSES
        'schedule_response_create': '../schedule_responses/priv/default/js/schedule_response_create',

        // USER ADMIN
        'jquery-multiselect': '../lib/js/jquery.multiselect/jquery.multiselect',
        'jquery-multiselect-filter': '../lib/js/jquery.multiselect/jquery.multiselect.filter',
        'shiftselect': '../lib/js/shiftSelect/shiftSelect',
        'user-admin': '../management/priv/default/js/user_admin/base_ajax',
        'jquery-formset': '../lib/js/jquery/jquery.formset.min',
        'user_edit': '../management/priv/default/js/user_admin/user_edit',

        // TUTOR TABLE
        'alertifyjs': '../table/libs/alertifyjs/js/alertify.min',
        'tt_datatables': '../table/libs/datatables/js/jquery.dataTables.min',
        'tt_jqueryui': '../table/libs/jquery/js/jquery-ui.min',
        'tt_datatables-fixedcolumns': '../table/libs/datatables/js/dataTables.fixedColumns.min',
        'tt_core': '../table/prod/build.min',
        'tt_history': '../table/prod/history.min',

        // STUDENT PROGRESS
        'student_progress': '../cabinet/priv/default/js/student_progress',

        // DISCIPLINE EDIT
        'discipline_edit_lessons' : '../discipline_edit/js/lessons.min',
        'discipline_edit_about' : '../discipline_edit/js/about.min',
        'discipline_edit_scale' : '../discipline_edit/js/scale.min',
        'discipline_edit_system_info' : '../discipline_edit/js/system_info.min',
        'discipline_edit_tutors' : '../discipline_edit/js/tutors.min'
    },
    shim: {
        'main': ['underscore', 'qtip', 'markitup', 'jqmodal', 'chosen', 'Highlight', 'Highlight-lineNumbers',
            'timepicker', 'jquery-tmpl'],

        // BUNDLES
        'main.bundle': ['main'],
        'blogs.bundle': ['main.bundle'],
        'profiles.bundle': ['main.bundle', 'jcrop'],
        'registration_constructor.bundle': ['main.bundle'],
        'cabinet.bundle': ['main.bundle', 'chart', 'datatables'],
        'career.bundle': ['main.bundle'],
        'mgmt.bundle': ['alertifyjs', 'ckeditor', 'qtip', 'timepicker'],
        'talks.bundle': ['main.bundle', 'jquery-scrollTo', 'msg', 'jquery-autocomplete'],

        // LIBS
        'datatables': ['jquery'],
        'jqmodal': ['jquery'],
        'qtip': ['jquery'],
        'chosen': ['jquery'],
        "jquery-form": ['jquery'],
        'markitup': ['jquery'],
        'jquery-notifier': ['jquery'],
        'msg': ['jquery', 'jquery-notifier'],
        'jquery-autocomplete': ['jquery', 'jquery-ui'],
        'jquery-tmpl': ['jquery'],
        'Highlight-lineNumbers': ['Highlight'],
        'jquery-cookie': ['jquery'],
        'timepicker': ['jquery', 'jquery-ui'],
        'exif': ['FileAPI'],
        'jquery-fileapi': ['FileAPI', 'exif'],
        'jcrop': ['jquery-fileapi'],

        // ACHIEVEMENTS
        'achievements-dashboard': ['chart'],

        // SHOWCASE
        // 'edu_project': ['jquery', 'jquery-cookie', 'jqmodal', 'underscore', 'jcrop'],

        // MANAGEMENT
        'management_curriculum_marks': ['datatables'],
        'management_schedule_responses': ['chart', 'qtip'],
        'management_attendance': ['management_schedule_responses'],

        // SCHEDULE RESPONSES
        'schedule_response_create': ['qtip'],

        // USER ADMIN
        'jquery-multiselect': ['main', 'jquery-ui'],
        'jquery-multiselect-filter': ['main', 'jquery-ui'],
        'user-admin': ['jquery-multiselect', 'jquery-multiselect-filter', 'main'],
        'jquery-formset': ['jquery'],
        'selection_dashboard': ['chart'],
        'selection_forms': ['jquery-autocomplete', 'datatables'],
        'selection_control': ['datatables'],
        'selection_control_new': ['datatables', 'jquery-ui', 'moment'],
        'user_edit': ['jquery', 'msg'],

        // TUTOR TABLE
        'alertifyjs': ['jquery'],
        'tt_datatables': ['jquery'],
        'tt_jqueryui': ['jquery'],
        'tt_datatables-fixedcolumns': ['tt_datatables'],
        'tt_core': ['alertifyjs', 'tt_jqueryui', 'tt_datatables', 'tt_datatables-fixedcolumns'],
        'tt_history': ['alertifyjs', 'tt_datatables'],

        // STUDENT PROGRESS
        'student_progress': ['main', 'datatables'],

        // DISCIPLINE EDIT
        'discipline_edit_lessons' : ['main', 'moment', 'moment-ru', 'alertifyjs', 'ckeditor'],
        'discipline_edit_about' : ['main', 'alertifyjs', 'ckeditor'],
        'discipline_edit_scale' : ['main', 'alertifyjs'],
        'discipline_edit_system_info' : ['main', 'alertifyjs'],
        'discipline_edit_tutors' : ['main', 'alertifyjs']
    }
});
initScript();